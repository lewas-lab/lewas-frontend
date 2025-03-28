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
                </header>
                <main>{children}</main>
            </div>
        </>
    );
};

export default Layout;