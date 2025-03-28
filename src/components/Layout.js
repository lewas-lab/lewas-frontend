// src/components/Layout.js
import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ children, title = 'LEWAS Lab Data' }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="container">
                <header>
                    <h1>{title}</h1>
                    <nav>
                        <div className="nav-links">
                            <Link href="/" className="nav-link">Home</Link>
                            <Link href="/raw-data" className="nav-link">Raw Data</Link>
                            <Link href="/sensor-readings" className="nav-link">Sensor Readings</Link>
                            <Link href="/visualizations" className="nav-link">Visualizations</Link>
                            <Link href="/chatbot" className="nav-link">Chatbot</Link>
                            <Link href="/team" className="nav-link">Team</Link>
                        </div>
                    </nav>
                </header>
                <main>{children}</main>
                <footer>
                    <p>LEWAS Lab Environmental Monitoring - Under Development</p>
                </footer>
            </div>
        </>
    );
};

export default Layout;