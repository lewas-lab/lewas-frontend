import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function ErrorPage() {
    const router = useRouter();

    // Redirect to the home page
    useEffect(() => {
        router.replace('/');
    }, [router]);

    return (
        <Layout title="Redirecting...">
            <p>Redirecting to home page...</p>
        </Layout>
    );
}