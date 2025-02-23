import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import { Gabarito } from 'next/font/google';
import clsx from 'clsx';

import Footer from '@/components/Footer';

import '@root/faust.config';
import '@/styles/globals.css';

const gabarito = Gabarito({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
    const router = useRouter();

    return (
        <FaustProvider pageProps={pageProps}>
            <div className="fixed inset-0 flex justify-center sm:px-8">
                <div className="bg-grid-pattern absolute inset-0 z-5 h-full w-full bg-transparent bg-[size:14px_24px]">
                    <div className="blur-4xl absolute top-0 right-0 left-0 -z-10 m-auto h-80 w-80 rounded-full bg-fuchsia-400 opacity-20" />
                </div>
                <div className="flex w-full max-w-7xl lg:px-8">
                    <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
                </div>
            </div>

            <div className={clsx('relative', gabarito.className)}>
                <Component {...pageProps} key={router.asPath} />
                <Footer />
            </div>
        </FaustProvider>
    );
}
