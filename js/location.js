class LocationHandler {
    static currentPosition = { lat: null, lng: null };

    static async initializeLocation() {
        if (navigator.geolocation) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.currentPosition.lat = position.coords.latitude;
                        this.currentPosition.lng = position.coords.longitude;
                        resolve(this.currentPosition);
                    },
                    (error) => reject(error)
                );
            });
        } else {
            throw new Error("Geolocation is not supported by this browser.");
        }
    }

    static async getAddress(lat, lng) {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        return data.display_name || "Unknown Location";
    }

    static async updateMap(containerId, onPositionChange) {
        const map = L.map(containerId).setView([this.currentPosition.lat, this.currentPosition.lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        const marker = L.marker([this.currentPosition.lat, this.currentPosition.lng], { draggable: true }).addTo(map);

        marker.on('dragend', async (event) => {
            const newPosition = event.target.getLatLng();
            this.currentPosition.lat = newPosition.lat;
            this.currentPosition.lng = newPosition.lng;
            const newAddress = await this.getAddress(newPosition.lat, newPosition.lng);
            onPositionChange(newPosition, newAddress);
        });
    }
}
