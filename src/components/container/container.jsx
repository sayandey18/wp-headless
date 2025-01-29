import Head from "next/head";

export default function Container(props) {
    const { children, ...customMeta } = props;

    const meta = {
        ...customMeta
    };

    return (
        <>
            <Head>
                <title>{meta?.title}</title>
            </Head>
            {children}
        </>
    );
}