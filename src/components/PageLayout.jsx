import Head from 'next/head';
import Parser from 'html-react-parser';
import Container from '@/components/Container';

export default function PageLayout({ page, children }) {
    const pageHeading = page?.title;
    const pageSeoMeta = page?.yoast;

    return (
        <>
            <Head>{pageSeoMeta && Parser(pageSeoMeta)}</Head>

            <Container className="mt-12 sm:mt-24">
                <header className="max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                        {pageHeading}
                    </h1>
                </header>
                <div
                    className="mt-6 w-full text-zinc-600 sm:mt-10 dark:text-zinc-400"
                    dangerouslySetInnerHTML={{ __html: children }}
                />
            </Container>
        </>
    );
}
