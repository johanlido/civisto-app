class ReportHandler {
    static async sendReport(description) {
        const formatCoordinates = (value) => value.toString().replace(',', '.');

        const reportData = {
            image: "https://h7.alamy.com/comp/2JPB15B/irish-police-an-garda-siochana-road-block-with-signs-and-barriers-2JPB15B.jpg",
            description,
            coordinates: {
                lat: formatCoordinates(LocationHandler.currentPosition.lat),
                long: formatCoordinates(LocationHandler.currentPosition.lng),
            },
            qrCode: "",
            timestamp: new Date().toISOString(),
            userProfile: "Private",
        };

        const targetUrl = "http://103.177.248.131:5678/webhook/7475d8ba-6602-4633-b3f0-30d0c002a1de";

        try {
            const response = await fetch(targetUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reportData),
            });

            if (!response.ok) {
                throw new Error(`Failed to send report: ${response.status} ${response.statusText}`);
            }

            console.log("Report submitted successfully!");
        } catch (error) {
            console.error("Failed to submit the report. Error details:", error);
        }
    }
}
