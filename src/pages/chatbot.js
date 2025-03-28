// src/pages/chatbot.js - FIXED VERSION
import { useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Chatbot() {
    // Streamlit chatbot URL - replace with your actual URL
    const chatbotUrl = "https://your-streamlit-chatbot-url.streamlit.app";

    return (
        <Layout title="LEWAS Lab - Environmental Chatbot">
            <div className="chatbot-container">
                <h2>LEWAS Lab Environmental Data Chatbot</h2>

                <div className="chatbot-info">
                    <div className="chatbot-description">
                        <h3>About Our Chatbot</h3>
                        <p>
                            Our environmental data chatbot allows you to interact with the Stroubles Creek
                            sensor data through natural language questions. Ask about temperature trends,
                            humidity levels, or other environmental parameters.
                        </p>

                        <h3>Example Questions You Can Ask:</h3>
                        <ul className="chatbot-examples">
                            <li>&quot;What was the highest temperature recorded today?&quot;</li>
                            <li>&quot;How has humidity changed over the past 24 hours?&quot;</li>
                            <li>&quot;Show me the pressure readings from this morning.&quot;</li>
                            <li>&quot;What&apos;s the relationship between light levels and temperature?&quot;</li>
                        </ul>
                    </div>

                    <div className="chatbot-access">
                        <h3>Access the Chatbot</h3>
                        <p>Our chatbot is hosted on Streamlit. Click the button below to start interacting with our environmental data.</p>

                        <a href={chatbotUrl} target="_blank" rel="noopener noreferrer" className="chatbot-button">
                            Launch Environmental Chatbot
                        </a>

                        <div className="chatbot-note">
                            <p>Note: The chatbot opens in a new tab and is hosted on the Streamlit platform.</p>
                        </div>
                    </div>
                </div>

                <div className="development-notice">
                    <p>This feature is currently under active development. Additional capabilities will be added soon.</p>
                </div>
            </div>
        </Layout>
    );
}