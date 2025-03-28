// src/pages/index.js
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout title="LEWAS Lab Environmental Monitoring">
      <div className="home-container">
        <div className="welcome-section">
          <h2>Welcome to the LEWAS Lab Environmental Monitoring Dashboard</h2>
          <p>
            This dashboard provides real-time environmental sensor data from Stroubles Creek.
          </p>
        </div>

        <div className="button-container">
          <Link href="/raw-data">
            <button>View Raw Data</button>
          </Link>

          <Link href="/sensor-readings">
            <button>View Sensor Readings</button>
          </Link>

          <Link href="/visualizations">
            <button>View Visualizations</button>
          </Link>

          <Link href="/chatbot">
            <button>Environmental Chatbot</button>
          </Link>
        </div>

        <div className="development-notice">
          <p>This website is currently under development.</p>
        </div>
      </div>
    </Layout>
  );
}