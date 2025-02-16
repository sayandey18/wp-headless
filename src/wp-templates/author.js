import Head from 'next/head';
import parse from 'html-react-parser';
import { gql } from '@apollo/client';
import Image from 'next/image';
import Container from '@/components/Container';

export default function Author({ data, loading }) {
    // Loading state for previews
    if (loading) {
        return <>Loading...</>;
    }

    const {
        name: authorName,
        avatar: authorAvater,
        description: authorInfo,
        seo: authorSeoMeta
    } = data?.user;

    return (
        <>
            <Head>{authorSeoMeta && parse(authorSeoMeta?.fullHead)}</Head>

            <Container className="mt-12 sm:mt-24">
                <header className="w-full">
                    <h1 className="text-center text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                        {authorName}
                    </h1>
                </header>
                <div className="m-auto my-8 max-w-3xl text-zinc-600 dark:text-zinc-400">
                    <Image
                        src={authorAvater?.url}
                        alt={authorName}
                        width={100}
                        height={100}
                        className="m-auto h-25 w-25 cursor-pointer rounded-3xl bg-zinc-100 object-cover dark:bg-zinc-800"
                    />
                    <p className="mt-8 text-center text-base">{authorInfo}</p>
                </div>
            </Container>
        </>

        // <Container siteMeta={authorSeoMeta}>
        //     <Header menuItems={primaryMenu} />
        //     <div>
        //         <div>
        //             <Image
        //                 src={authorAvater?.url}
        //                 alt={authorName}
        //                 width={100}
        //                 height={100}
        //             />
        //         </div>
        //         <div>
        //             <h1>{authorName}</h1>
        //             <p>{authorInfo}</p>
        //         </div>
        //     </div>
        // </Container>
    );
}

Author.variables = ({ databaseId }, ctx) => {
    return {
        databaseId,
        asPreview: ctx?.asPreview
    };
};

Author.query = gql`
    query AuthorPageQuery($databaseId: ID!) {
        user(id: $databaseId, idType: DATABASE_ID) {
            name
            description
            avatar(size: 100) {
                url
            }
            seo {
                fullHead
            }
        }
    }
`;
