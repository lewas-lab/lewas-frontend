// API service for fetching data
export const ApiService = {
    // Function to fetch raw data
    async fetchRawData() {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },

    // Function to fetch sensor readings
    async fetchSensorReadings() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sensors/readings`, {
                // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sensors/readings?limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching sensor readings:', error);
            throw error;
        }
    }
};

// Helper functions
export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
};