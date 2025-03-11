import Head from 'next/head';
import Parser from 'html-react-parser';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BlurFade } from '@/components/MagicUi';

export default function Layout({ config, children }) {
    return (
        <BlurFade delay={0.25} duration={0.5}>
            <Head>{config?.metaData && Parser(config.metaData)}</Head>
            <Header menu={config?.primaryMenus} />
            <main id="skip">{children}</main>
            <Footer menu={config?.footerMenus} social={config?.socialLinks} />
        </BlurFade>
    );
}
