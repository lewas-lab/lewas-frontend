import Layout from '../components/Layout';
import Link from 'next/link';

export default function Custom404() {
    return (
        <Layout title="404 - Page Not Found">
            <p>The page you are looking for does not exist.</p>
            <p>
                <Link href="/">
                    <a style={{ color: '#4CAF50', textDecoration: 'underline' }}>
                        Return to Home
                    </a>
                </Link>
            </p>
        </Layout>
    );
}