import Container from '@/components/Container';

export default function Page404() {
    return (
        <Container className="mt-12 sm:mt-24">
            <header className="max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                    404
                </h1>
            </header>
            <div className="mt-6 w-full text-zinc-600 dark:text-zinc-400">
                Page Not Found
            </div>
        </Container>
    );
}
