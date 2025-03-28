// src/pages/sensor-readings.js
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SensorTable from '../components/SensorTable';
import { ApiService } from '../services/api';

export default function SensorReadings() {
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

    return (
        <Layout title="LEWAS Lab - Sensor Readings">
            <h2>Sensor Readings</h2>

            <div className="result-container">
                {loading && <p>Loading data...</p>}
                {error && <p>Error: {error}</p>}
                {data && <SensorTable data={data} />}
            </div>
        </Layout>
    );
}