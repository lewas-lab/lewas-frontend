// src/pages/raw-data.js
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import RawDataDisplay from '../components/RawDataDisplay';
import { ApiService } from '../services/api';

export default function RawData() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const result = await ApiService.fetchRawData();
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
        <Layout title="LEWAS Lab - Raw Data">
            <h2>Raw API Response Data</h2>

            <div className="result-container">
                {loading && <p>Loading data...</p>}
                {error && <p>Error: {error}</p>}
                {data && <RawDataDisplay data={data} />}
            </div>
        </Layout>
    );
}