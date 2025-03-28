// src/pages/visualizations.js
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { ApiService } from '../services/api';

export default function Visualizations() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const result = await ApiService.fetchSensorReadings();
                setData(result);
                setLoading(false);
            } catch (err) {
                setError('Failed to load sensor data');
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Function to group readings by parameter type
    const groupReadingsByParameter = (readings) => {
        const grouped = {
            temperature: [],
            humidity: [],
            pressure: [],
            light: []
        };

        if (readings && readings.length > 0) {
            readings.forEach(reading => {
                if (grouped[reading.parameter_type]) {
                    grouped[reading.parameter_type].push(reading);
                }
            });
        }

        return grouped;
    };

    // Function to format time from timestamp
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) return (
        <Layout title="LEWAS Lab - Visualizations">
            <div className="loading">Loading visualization data...</div>
        </Layout>
    );

    if (error) return (
        <Layout title="LEWAS Lab - Visualizations">
            <div className="error">Error: {error}</div>
        </Layout>
    );

    if (!data || !data.readings || data.readings.length === 0) {
        return (
            <Layout title="LEWAS Lab - Visualizations">
                <div>No data available for visualization</div>
            </Layout>
        );
    }

    const groupedData = groupReadingsByParameter(data.readings);

    // Find min/max values for each parameter type
    const getMinMax = (readings) => {
        if (!readings || readings.length === 0) return { min: 0, max: 100 };

        let min = readings[0].value;
        let max = readings[0].value;

        readings.forEach(reading => {
            if (reading.value < min) min = reading.value;
            if (reading.value > max) max = reading.value;
        });

        return { min, max };
    };

    // Calculate bar height percentage
    const calculateBarHeight = (value, min, max) => {
        if (max === min) return 50; // Default height if all values are the same
        return ((value - min) / (max - min)) * 80 + 10; // Scale to 10-90% for visibility
    };

    // Calculate data insights
    const calculateInsights = () => {
        const insights = {};

        if (groupedData.temperature.length > 0) {
            const { min, max } = getMinMax(groupedData.temperature);
            insights.tempRange = `${min.toFixed(1)}°C - ${max.toFixed(1)}°C`;
        }

        if (groupedData.humidity.length > 0) {
            const sum = groupedData.humidity.reduce((acc, curr) => acc + curr.value, 0);
            insights.avgHumidity = (sum / groupedData.humidity.length).toFixed(1) + '%';
        }

        if (groupedData.pressure.length > 0) {
            const { min, max } = getMinMax(groupedData.pressure);
            insights.pressureVar = (max - min).toFixed(2) + ' hPa';
        }

        if (groupedData.light.length > 0) {
            const { max } = getMinMax(groupedData.light);
            insights.maxLight = max.toFixed(1) + ' lux';
        }

        return insights;
    };

    const insights = calculateInsights();

    return (
        <Layout title="LEWAS Lab - Visualizations">
            <div className="visualizations-container">
                <h2>Environmental Data Visualizations</h2>
                <p>Visual representation of SIMULATED sensor data from Stroubles Creek. We are working on getting live data</p>

                {/* Temperature Chart */}
                {groupedData.temperature.length > 0 && (
                    <div className="chart-section">
                        <h3>Temperature Data (°C)</h3>
                        <div className="chart-container">
                            <div className="chart-bars">
                                {groupedData.temperature.map((reading, index) => {
                                    const { min, max } = getMinMax(groupedData.temperature);
                                    return (
                                        <div key={index} className="chart-bar-wrapper">
                                            <div className="chart-bar-container">
                                                <div
                                                    className="chart-bar temperature-bar"
                                                    style={{ height: `${calculateBarHeight(reading.value, min, max)}%` }}
                                                >
                                                    <span className="bar-value">{reading.value.toFixed(1)}</span>
                                                </div>
                                            </div>
                                            <div className="bar-label">{formatTime(reading.timestamp)}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Humidity Chart */}
                {groupedData.humidity.length > 0 && (
                    <div className="chart-section">
                        <h3>Humidity Data (%)</h3>
                        <div className="chart-container">
                            <div className="chart-bars">
                                {groupedData.humidity.map((reading, index) => {
                                    const { min, max } = getMinMax(groupedData.humidity);
                                    return (
                                        <div key={index} className="chart-bar-wrapper">
                                            <div className="chart-bar-container">
                                                <div
                                                    className="chart-bar humidity-bar"
                                                    style={{ height: `${calculateBarHeight(reading.value, min, max)}%` }}
                                                >
                                                    <span className="bar-value">{reading.value.toFixed(1)}</span>
                                                </div>
                                            </div>
                                            <div className="bar-label">{formatTime(reading.timestamp)}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Pressure Chart */}
                {groupedData.pressure.length > 0 && (
                    <div className="chart-section">
                        <h3>Pressure Data (hPa)</h3>
                        <div className="chart-container">
                            <div className="chart-bars">
                                {groupedData.pressure.map((reading, index) => {
                                    const { min, max } = getMinMax(groupedData.pressure);
                                    return (
                                        <div key={index} className="chart-bar-wrapper">
                                            <div className="chart-bar-container">
                                                <div
                                                    className="chart-bar pressure-bar"
                                                    style={{ height: `${calculateBarHeight(reading.value, min, max)}%` }}
                                                >
                                                    <span className="bar-value">{reading.value.toFixed(1)}</span>
                                                </div>
                                            </div>
                                            <div className="bar-label">{formatTime(reading.timestamp)}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Light Chart */}
                {groupedData.light.length > 0 && (
                    <div className="chart-section">
                        <h3>Light Level Data (lux)</h3>
                        <div className="chart-container">
                            <div className="chart-bars">
                                {groupedData.light.map((reading, index) => {
                                    const { min, max } = getMinMax(groupedData.light);
                                    return (
                                        <div key={index} className="chart-bar-wrapper">
                                            <div className="chart-bar-container">
                                                <div
                                                    className="chart-bar light-bar"
                                                    style={{ height: `${calculateBarHeight(reading.value, min, max)}%` }}
                                                >
                                                    <span className="bar-value">{reading.value.toFixed(1)}</span>
                                                </div>
                                            </div>
                                            <div className="bar-label">{formatTime(reading.timestamp)}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Data Insights */}
                <div className="data-insights">
                    <h3>Data Insights</h3>
                    <div className="insights-grid">
                        {insights.tempRange && (
                            <div className="insight-card">
                                <h4>Temperature Range</h4>
                                <p>{insights.tempRange}</p>
                            </div>
                        )}

                        {insights.avgHumidity && (
                            <div className="insight-card">
                                <h4>Average Humidity</h4>
                                <p>{insights.avgHumidity}</p>
                            </div>
                        )}

                        {insights.pressureVar && (
                            <div className="insight-card">
                                <h4>Pressure Variation</h4>
                                <p>{insights.pressureVar}</p>
                            </div>
                        )}

                        {insights.maxLight && (
                            <div className="insight-card">
                                <h4>Peak Light Level</h4>
                                <p>{insights.maxLight}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}