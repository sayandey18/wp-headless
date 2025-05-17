import Container from '@/components/Container';

export default function PageLayout({ entry, children }) {
    return (
        <Container className="mt-12 sm:mt-24">
            <header className="max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                    {entry?.pageTitle}
                </h1>
            </header>
            {children && children}
        </Container>
    );
}
