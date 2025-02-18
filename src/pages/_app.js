import '@root/faust.config';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import { DM_Mono } from 'next/font/google';
import { SoundProvider } from '@/context/sound';
import clsx from 'clsx';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import '@/styles/globals.css';

const dmono = DM_Mono({
    weight: ['300', '400', '500'],
    subsets: ['latin']
});

export default function App({ Component, pageProps }) {
    const router = useRouter();

    return (
        <FaustProvider pageProps={pageProps}>
            <SoundProvider>
                <div className="fixed inset-0 flex justify-center sm:px-8">
                    <div className="flex w-full max-w-7xl lg:px-8">
                        <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
                    </div>
                </div>

                <div className={clsx('relative', dmono.className)}>
                    <Header />
                    <main>
                        <Component {...pageProps} key={router.asPath} />
                    </main>
                    <Footer />
                </div>
            </SoundProvider>
        </FaustProvider>
    );
}
