import { useState } from 'react';
import Layout from '../components/Layout';
import SensorTable from '../components/SensorTable';
import RawDataDisplay from '../components/RawDataDisplay';
import { ApiService } from '../services/api';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleFetchData() {
    setLoading(true);
    try {
      const result = await ApiService.fetchRawData();
      setData(result);
    } catch (error) {
      setData({ error: error.message });
    } finally {
      setLoading(false);
    }
  }

  async function handleFetchSensorReadings() {
    setLoading(true);
    try {
      const result = await ApiService.fetchSensorReadings();
      setData(result);
    } catch (error) {
      setData({ error: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title="API Test">
      <p>Access data from the API</p>

      <div className="button-container">
        <button onClick={handleFetchData}>Fetch Raw Data</button>
        <button onClick={handleFetchSensorReadings}>View Sensor Readings</button>
      </div>

      <div className="result-container">
        {loading ? (
          <p>Loading...</p>
        ) : !data ? (
          <p>Select an option above to fetch data</p>
        ) : data.error ? (
          <>
            <h2>Error:</h2>
            <p>{data.error}</p>
          </>
        ) : data.readings ? (
          <SensorTable data={data} />
        ) : (
          <RawDataDisplay data={data} />
        )}
      </div>
    </Layout>
  );
}