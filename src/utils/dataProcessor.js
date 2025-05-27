// utils/dataProcessor.js - Fixed for your backend format
export class DataProcessor {
    constructor() {
        // Constants from original code
        this.velocitySlope = 0.7896014;
        this.velocityOffset = -0.016046;
        this.datumOffset = 0.128;
        this.elevation = 626; // meters
        this.airTemp = 10; // default air temperature for pressure correction
    }

    // Process Stage data (water/velocity-z)
    processStageData(rawData) {
        return rawData.map(point => ({
            ...point,
            value: point.value + this.datumOffset // Add 0.128 offset
        }));
    }

    // Process Downstream Velocity (basic velocity correction)
    processDownstreamVelocity(rawData) {
        return rawData.map(point => ({
            ...point,
            value: (point.value * this.velocitySlope) + this.velocityOffset
        }));
    }

    // Process Smoothed Velocity (velocity correction + smoothing)
    processSmoothedVelocity(rawData) {
        if (rawData.length === 0) return [];

        // Step 1: Apply velocity correction
        let processedData = rawData.map(point => ({
            ...point,
            value: (point.value * this.velocitySlope) + this.velocityOffset
        }));

        // Step 2: Apply alpha smoothing filter
        for (let i = 1; i < processedData.length; i++) {
            const absValue = Math.abs(processedData[i].value);
            const alpha = Math.min(Math.max(absValue, 24.5) - 23, 30) / 30;

            if (absValue < Infinity) {
                processedData[i].value = (1 - alpha) * processedData[i - 1].value + alpha * processedData[i].value;
            } else {
                processedData[i].value = processedData[i - 1].value;
            }
        }

        return processedData;
    }

    // Process Flow Rate (smoothed velocity + flow rate calculation)
    processFlowRate(rawData) {
        if (rawData.length === 0) return [];

        // First apply smoothed velocity processing
        let processedData = this.processSmoothedVelocity(rawData);

        // Then apply flow rate calculation
        processedData = processedData.map(point => {
            let velocity = point.value * 0.01; // Convert to m/s

            // Apply cubic polynomial flow rate formula
            const flowRate = 2.5715 * Math.pow(velocity, 3)
                - 1.7058 * Math.pow(velocity, 2)
                + 1.4465 * velocity
                - 0.0324 + 0.015;

            return {
                ...point,
                value: flowRate
            };
        });

        return processedData;
    }

    // Process Air Pressure (altitude correction)
    processAirPressure(rawData) {
        return rawData.map(point => {
            const correctedValue = point.value *
                (16000 + 64 * this.airTemp + this.elevation) /
                (16000 + 64 * this.airTemp - this.elevation);

            return {
                ...point,
                value: correctedValue
            };
        });
    }

    // Apply unit conversions
    applyUnitConversion(data, fromUnit, toUnit, conversionType) {
        if (fromUnit === toUnit) return data;

        const conversions = {
            temperature: {
                'C_to_F': (c) => (c * 1.8) + 32,
                'F_to_C': (f) => (f - 32) * 0.5556
            },
            distance: {
                'm_to_ft': (m) => m * 3.28084,
                'ft_to_m': (ft) => ft / 3.28084
            },
            velocity: {
                'ms_to_fts': (ms) => ms * 3.28084,
                'fts_to_ms': (fts) => fts / 3.28084,
                'cms_to_fts': (cms) => cms * 0.0328084
            },
            flowRate: {
                'm3s_to_ft3s': (m3s) => m3s * 35.3147,
                'ft3s_to_m3s': (ft3s) => ft3s / 35.3147
            },
            pressure: {
                'hPa_to_inHg': (hPa) => hPa / 33.86,
                'inHg_to_hPa': (inHg) => inHg * 33.86
            },
            precipitation: {
                'mm_to_in': (mm) => mm * 0.0393,
                'in_to_mm': (inches) => inches / 0.0393
            },
            conductivity: {
                'mScm_to_uScm': (mScm) => mScm * 1000,
                'uScm_to_mScm': (uScm) => uScm / 1000
            }
        };

        const conversionKey = `${fromUnit}_to_${toUnit}`;
        const conversionFn = conversions[conversionType]?.[conversionKey];

        if (!conversionFn) {
            console.warn(`No conversion available for ${fromUnit} to ${toUnit} in ${conversionType}`);
            return data;
        }

        return data.map(point => ({
            ...point,
            value: conversionFn(point.value)
        }));
    }

    // Main processing function
    processParameterData(rawData, parameterType, unitSystem = 'SI') {
        let processedData = [...rawData];

        // Apply parameter-specific processing
        switch (parameterType) {
            case 'stage':
                processedData = this.processStageData(processedData);
                break;
            case 'smoothed_velocity':
                processedData = this.processSmoothedVelocity(processedData);
                break;
            case 'flow_rate':
                processedData = this.processFlowRate(processedData);
                break;
            case 'downstream_velocity':
                processedData = this.processDownstreamVelocity(processedData);
                break;
            case 'air_pressure':
                processedData = this.processAirPressure(processedData);
                break;
            default:
                // No special processing needed
                break;
        }

        // Apply unit conversions based on unit system
        if (unitSystem === 'US') {
            processedData = this.convertToUSUnits(processedData, parameterType);
        }

        return processedData;
    }

    // Convert to US units
    convertToUSUnits(data, parameterType) {
        const unitMappings = {
            'stage': { type: 'distance', from: 'm', to: 'ft' },
            'smoothed_velocity': { type: 'velocity', from: 'cms', to: 'fts' },
            'flow_rate': { type: 'flowRate', from: 'm3s', to: 'ft3s' },
            'downstream_velocity': { type: 'velocity', from: 'cms', to: 'fts' },
            'water_temperature': { type: 'temperature', from: 'C', to: 'F' },
            'air_temperature': { type: 'temperature', from: 'C', to: 'F' },
            'air_pressure': { type: 'pressure', from: 'hPa', to: 'inHg' },
            'rain_intensity': { type: 'precipitation', from: 'mm', to: 'in' },
            'rain_accumulation': { type: 'precipitation', from: 'mm', to: 'in' },
            'specific_conductance': { type: 'conductivity', from: 'mScm', to: 'uScm' }
        };

        const mapping = unitMappings[parameterType];
        if (!mapping) return data;

        return this.applyUnitConversion(data, mapping.from, mapping.to, mapping.type);
    }

    // Format data for D3 visualization - FIXED for your backend format
    formatForVisualization(processedData) {
        return processedData.map(point => {
            // Your backend uses 'timestamp' field, not 'datetime'
            let date;

            if (point.timestamp) {
                date = new Date(point.timestamp);
            } else if (point.datetime) {
                date = new Date(point.datetime);
            } else {
                console.error('No timestamp or datetime found in data point:', point);
                return null;
            }

            // Validate the date
            if (isNaN(date.getTime())) {
                console.error('Invalid date:', point.timestamp || point.datetime);
                return null;
            }

            return {
                x: date,
                y: point.value,
                timestamp: point.timestamp,
                unit: point.unit
            };
        }).filter(Boolean); // Remove any null entries
    }

    // Filter data by time range
    filterByTimeRange(data, startTime, endTime) {
        const start = new Date(startTime);
        const end = new Date(endTime);

        return data.filter(point => {
            // Use timestamp field for your backend
            const pointTime = new Date(point.timestamp || point.datetime);
            return pointTime >= start && pointTime <= end;
        });
    }

    // Remove outliers (optional)
    removeOutliers(data, threshold = 3) {
        if (data.length < 3) return data;

        const values = data.map(point => point.value);
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const stdDev = Math.sqrt(
            values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
        );

        return data.filter(point =>
            Math.abs(point.value - mean) <= threshold * stdDev
        );
    }
}

// Export singleton instance
export const dataProcessor = new DataProcessor();