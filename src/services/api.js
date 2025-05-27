// src/services/api.js - Debug version with logging
export const ApiService = {
    // Base API configuration
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1/sensors`,
    apiKey: process.env.NEXT_PUBLIC_API_KEY,

    // Helper method to make API calls
    async makeRequest(endpoint, params = {}) {
        try {
            const url = new URL(`${this.baseURL}${endpoint}`);

            // Add query parameters
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    url.searchParams.append(key, params[key]);
                }
            });

            // Debug logging
            console.log('🔍 API Request Details:');
            console.log('Base URL:', this.baseURL);
            console.log('Endpoint:', endpoint);
            console.log('Full URL:', url.toString());
            console.log('Parameters:', params);
            console.log('API Key:', this.apiKey);

            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': this.apiKey
                }
            });

            console.log('📡 Response Status:', response.status);
            console.log('📡 Response Headers:', Object.fromEntries(response.headers.entries()));

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Error Response Body:', errorText);
                throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('✅ Response Data:', data);
            return data;
        } catch (error) {
            console.error('🚨 API Request Error:', error);
            throw error;
        }
    },

    // Fetch observations with filtering
    async fetchObservations(filters = {}) {
        const {
            instrument,
            metric,
            medium,
            unit,
            startTime,
            endTime,
            limit = 1000
        } = filters;

        console.log('🎯 Fetching observations with filters:', filters);

        return await this.makeRequest('/observations', {
            instrument,
            metric,
            medium,
            unit,
            start_time: startTime,
            end_time: endTime,
            limit
        });
    },

    // Fetch specific parameter data for LEWAS frontend
    async fetchParameterData(parameterConfig, startTime, endTime) {
        const { metric, medium, instrument } = parameterConfig;

        console.log('🎯 Fetching parameter data:', {
            parameterConfig,
            startTime,
            endTime
        });

        return await this.fetchObservations({
            instrument,
            metric,
            medium,
            startTime,
            endTime,
            limit: 2000 // Higher limit for time series data
        });
    },

    // Test connection to backend
    async testConnection() {
        try {
            console.log('🔗 Testing connection to backend...');
            console.log('Base URL:', this.baseURL);

            // Try to fetch just the base URL or a simple endpoint
            const response = await fetch(this.baseURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': this.apiKey
                }
            });

            console.log('Connection test status:', response.status);
            return response.ok;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    }
};

// Parameter configuration mapping from frontend to backend
export const PARAMETER_CONFIG = {
    // Water Quantity Parameters
    'stage': {
        metric: 'velocity-z',
        medium: 'water',
        instrument: 'argonaut',
        processing: 'stage_correction'
    },
    'smoothed_velocity': {
        metric: 'velocity-x',
        medium: 'water',
        instrument: 'argonaut',
        processing: 'smoothed_velocity'
    },
    'flow_rate': {
        metric: 'velocity-x',
        medium: 'water',
        instrument: 'argonaut',
        processing: 'flow_rate_calculation'
    },
    'downstream_velocity': {
        metric: 'velocity-x',
        medium: 'water',
        instrument: 'argonaut',
        processing: 'velocity_correction'
    },

    // Water Quality Parameters
    'ph': {
        metric: 'ph',
        medium: 'water',
        instrument: 'sonde',
        processing: 'none'
    },
    'specific_conductance': {
        metric: 'specific-conductance',
        medium: 'water',
        instrument: 'sonde',
        processing: 'none'
    },
    'salinity': {
        metric: 'salinity',
        medium: 'water',
        instrument: 'sonde',
        processing: 'none'
    },
    'turbidity': {
        metric: 'turbidity',
        medium: 'water',
        instrument: 'sonde',
        processing: 'none'
    },
    'dissolved_oxygen': {
        metric: 'ldo',
        medium: 'water',
        instrument: 'sonde',
        processing: 'none'
    },
    'water_temperature': {
        metric: 'temperature',
        medium: 'water',
        instrument: 'sonde',
        processing: 'none'
    },
    'orp': {
        metric: 'redox',
        medium: 'water',
        instrument: 'sonde',
        processing: 'none'
    },

    // Weather Parameters
    'air_temperature': {
        metric: 'temperature',
        medium: 'air',
        instrument: 'weather-station',
        processing: 'none'
    },
    'humidity': {
        metric: 'humidity',
        medium: 'air',
        instrument: 'weather-station',
        processing: 'none'
    },
    'air_pressure': {
        metric: 'pressure',
        medium: 'air',
        instrument: 'weather-station',
        processing: 'pressure_correction'
    },
    'rain_intensity': {
        metric: 'intensity',
        medium: 'rain',
        instrument: 'weather-station',
        processing: 'none'
    },
    'rain_accumulation': {
        metric: 'accumulation',
        medium: 'rain',
        instrument: 'weather-station',
        processing: 'none'
    },
    'rain_duration': {
        metric: 'duration',
        medium: 'rain',
        instrument: 'weather-station',
        processing: 'none'
    }
};

// Helper functions
export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
};

export const formatDateForAPI = (date) => {
    return date.toISOString();
};

export const getYesterdaysDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
};

export const parseStartDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day, 0, 0, 0);
};

export const parseEndDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day, 23, 59, 59);
};