class LocationHandler {
    static currentPosition = { lat: null, lng: null };
    static mapInstance = null; // Store the map instance

    static async initializeLocation() {
        if (navigator.geolocation) {
            return new Promise((resolve, reject) => {
                const timeoutId = setTimeout(() => {
                    reject(new Error("Geolocation request timed out."));
                }, 10000); // Timeout after 10 seconds

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        clearTimeout(timeoutId); // Clear timeout on success
                        this.currentPosition.lat = position.coords.latitude;
                        this.currentPosition.lng = position.coords.longitude;
                        resolve(this.currentPosition);
                    },
                    (error) => {
                        clearTimeout(timeoutId); // Clear timeout on error
                        reject(error);
                    }
                );
            });
        } else {
            throw new Error("Geolocation is not supported by this browser.");
        }
    }

    static async getAddress(lat, lng) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            return data.display_name || "Unknown Location";
        } catch (error) {
            console.error("Failed to fetch address:", error);
            return "Unknown Location";
        }
    }

    static async updateMap(containerId, onPositionChange) {
        if (this.mapInstance) {
            console.log("Map already initialized. Reusing the existing map instance.");
            return this.mapInstance; // Return the existing map instance
        }

        const mapContainer = document.getElementById(containerId);
        if (!mapContainer) {
            console.error(`Map container with ID "${containerId}" not found.`);
            return;
        }

        const map = L.map(containerId).setView([this.currentPosition.lat, this.currentPosition.lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        const marker = L.marker([this.currentPosition.lat, this.currentPosition.lng], { draggable: true }).addTo(map);

        // Handle marker drag event
        marker.on('dragend', async (event) => {
            const newPosition = event.target.getLatLng();
            this.currentPosition.lat = newPosition.lat;
            this.currentPosition.lng = newPosition.lng;
            const newAddress = await this.getAddress(newPosition.lat, newPosition.lng);
            onPositionChange(newPosition, newAddress);
        });

        // Handle double-click event on the map
        map.on('dblclick', async (event) => {
            const newPosition = event.latlng;
            this.currentPosition.lat = newPosition.lat;
            this.currentPosition.lng = newPosition.lng;
            marker.setLatLng(newPosition); // Move the marker to the new position
            const newAddress = await this.getAddress(newPosition.lat, newPosition.lng);
            onPositionChange(newPosition, newAddress);
        });

        this.mapInstance = map; // Store the map instance
        return map; // Return the map instance for further use
    }
}
