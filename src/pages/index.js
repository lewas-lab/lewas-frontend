// src/pages/index.js
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout title="Dhruv's Lab Environmental Monitoring">
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">LEWAS Lab</h1>
            <h2 className="hero-subtitle">Environmental Monitoring Dashboard</h2>
            <p className="hero-description">
              Real-time environmental sensor data from Stroubles Creek, providing
              continuous monitoring and insights into water quality and environmental conditions.
            </p>
          </div>
        </section>

        {/* Main Navigation Cards */}
        <section className="navigation-section">
          <div className="nav-grid">
            <Link href="/live-data" className="nav-card nav-card-link primary">
              <div className="nav-card-icon">📊</div>
              <h3>Live Creek Data</h3>
              <p>View real-time environmental sensor data from Stroubles Creek</p>
              <span className="nav-card-arrow">→</span>
            </Link>

            <Link href="/chatbot" className="nav-card nav-card-link secondary">
              <div className="nav-card-icon">🤖</div>
              <h3>LEWAS Chatbot</h3>
              <p>Get instant answers about environmental data and research</p>
              <span className="nav-card-arrow">→</span>
            </Link>

            <Link href="/team" className="nav-card nav-card-link tertiary">
              <div className="nav-card-icon">👥</div>
              <h3>Our Team</h3>
              <p>Meet the researchers and scientists behind LEWAS Lab</p>
              <span className="nav-card-arrow">→</span>
            </Link>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="info-section">
          <div className="info-grid">
            <div className="info-card">
              <h4>Real-Time Monitoring</h4>
              <p>Continuous 24/7 data collection from multiple environmental sensors</p>
            </div>
            <div className="info-card">
              <h4>Research Focus</h4>
              <p>Supporting environmental research and water quality studies</p>
            </div>
            <div className="info-card">
              <h4>Open Data</h4>
              <p>Accessible environmental data for research and educational purposes</p>
            </div>
          </div>
        </section>

        {/* Development Notice */}
        <section className="notice-section">
          <div className="development-notice">
            <div className="notice-icon">🚧</div>
            <div className="notice-content">
              <p><strong>Development Notice:</strong> This website is currently under active development.
                New features and improvements are being added regularly.</p>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .home-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        /* Hero Section */
        .hero-section {
          text-align: center;
          padding: 3rem 0 4rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 12px;
          margin-bottom: 3rem;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 400;
          color: #34495e;
          margin-bottom: 1.5rem;
        }

        .hero-description {
          font-size: 1.1rem;
          color: #5a6c7d;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Navigation Section */
        .navigation-section {
          margin-bottom: 4rem;
        }

        .nav-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .nav-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .nav-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 2px solid transparent;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .nav-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .nav-card.primary {
          border-color: #3498db;
        }

        .nav-card.primary:hover {
          border-color: #2980b9;
          background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
        }

        .nav-card.secondary {
          border-color: #9b59b6;
        }

        .nav-card.secondary:hover {
          border-color: #8e44ad;
          background: linear-gradient(135deg, #ffffff 0%, #faf8ff 100%);
        }

        .nav-card.tertiary {
          border-color: #e67e22;
        }

        .nav-card.tertiary:hover {
          border-color: #d35400;
          background: linear-gradient(135deg, #ffffff 0%, #fffaf8 100%);
        }

        .nav-card-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .nav-card h3 {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #2c3e50;
        }

        .nav-card p {
          color: #5a6c7d;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .nav-card-arrow {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          font-size: 1.5rem;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .nav-card:hover .nav-card-arrow {
          opacity: 1;
          transform: translateX(4px);
        }

        /* Info Section */
        .info-section {
          margin-bottom: 3rem;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .info-card {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid #3498db;
        }

        .info-card h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .info-card p {
          color: #5a6c7d;
          font-size: 0.95rem;
          line-height: 1.4;
        }

        /* Notice Section */
        .notice-section {
          margin-top: 3rem;
        }

        .development-notice {
          background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
          border: 1px solid #ffc107;
          border-radius: 8px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .notice-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .notice-content p {
          margin: 0;
          color: #856404;
          font-size: 0.95rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.2rem;
          }

          .hero-subtitle {
            font-size: 1.3rem;
          }

          .nav-grid {
            grid-template-columns: 1fr;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .development-notice {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </Layout>
  );
}