import { Html, Head, Main, NextScript } from 'next/document';

const modeScript = `
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    updateMode();
    darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions);
    window.addEventListener('storage', updateModeWithoutTransitions);

    function updateMode() {
        const isSystemDarkMode = darkModeMediaQuery.matches;
        const isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode);

        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        if (isDarkMode === isSystemDarkMode) {
            delete window.localStorage.isDarkMode;
        }
    }

    function disableTransitionsTemporarily() {
        document.documentElement.classList.add('**:transition-none!');
        window.setTimeout(() => {
            document.documentElement.classList.remove('**:transition-none!');
        }, 0)
    }

    function updateModeWithoutTransitions() {
        disableTransitionsTemporarily();
        updateMode();
    }
`;

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <script dangerouslySetInnerHTML={{ __html: modeScript }} />
            </Head>
            <body className="flex h-full flex-col bg-zinc-50 dark:bg-black">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
