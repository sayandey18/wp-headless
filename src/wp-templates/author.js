import Head from 'next/head';
import Image from 'next/image';
import parse from 'html-react-parser';
import { gql } from '@apollo/client';

import { BlurFade } from '@/components/MagicUi';
import Header from '@/components/Header';
import Container from '@/components/Container';

import { PrimaryMenuFrag } from '@/graphql/general';

export default function Author(props) {
    const { data, loading } = props;

    // Loading state for previews
    if (loading) {
        return <>Loading...</>;
    }

    const menuItems = data?.menus?.nodes || [];
    const { name, avatar, description, seo } = data.user;

    return (
        <>
            <Head>{seo?.fullHead && parse(seo?.fullHead)}</Head>
            <BlurFade delay={0.25} duration={0.5}>
                <Header menu={menuItems} />

                <Container className="mt-12 sm:mt-24">
                    <header className="w-full">
                        <h1 className="text-center text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                            {name}
                        </h1>
                    </header>
                    <div className="m-auto my-8 max-w-2xl text-zinc-600 dark:text-zinc-400">
                        <Image
                            src={avatar?.url}
                            alt={name}
                            width={100}
                            height={100}
                            className="m-auto h-25 w-25 cursor-pointer rounded-3xl bg-zinc-100 object-cover dark:bg-zinc-800"
                        />
                        <p className="mt-8 text-center text-base">
                            {description}
                        </p>
                    </div>
                </Container>
            </BlurFade>
        </>
    );
}

Author.query = gql`
    ${PrimaryMenuFrag}
    query AuthorPageQuery($databaseId: ID!) {
        menus: menuItems(where: { location: PRIMARY, parentId: 0 }) {
            nodes {
                ...PrimaryMenuFrag
            }
        }

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

Author.variables = ({ databaseId }, ctx) => {
    return {
        databaseId,
        asPreview: ctx?.asPreview
    };
};
