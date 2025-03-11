import Image from 'next/image';
import { gql } from '@apollo/client';

import Layout from '@/components/Layout';
import Container from '@/components/Container';

import { PriMenuFrag, FooMenuFrag, SocialLinksFrag } from '@/graphql/general';

export default function Author(props) {
    if (props.loading) {
        return <>Loading...</>;
    }

    const { pmenu, fmenu, user, general } = props.data;

    const siteConfig = {
        metaData: user?.seo?.fullHead,
        primaryMenus: pmenu?.nodes || [],
        footerMenus: fmenu?.nodes || [],
        socialLinks: general?.social
    };

    const authorData = {
        authorName: user?.name,
        authorBio: user?.description,
        authorImg: user?.avatar?.url
    };

    return (
        <Layout config={siteConfig}>
            <Container className="mt-12 sm:mt-24">
                <header className="w-full">
                    <h1 className="text-center text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                        {authorData?.authorName}
                    </h1>
                </header>
                <div className="m-auto my-8 max-w-2xl text-zinc-600 dark:text-zinc-400">
                    <Image
                        src={authorData?.authorImg}
                        alt={authorData?.authorName}
                        width={100}
                        height={100}
                        priority={false}
                        className="m-auto h-25 w-25 cursor-pointer rounded-3xl bg-zinc-100 object-cover dark:bg-zinc-800"
                    />
                    <p className="mt-8 text-center text-base">
                        {authorData?.authorBio}
                    </p>
                </div>
            </Container>
        </Layout>
    );
}

Author.query = gql`
    ${PriMenuFrag}
    ${FooMenuFrag}
    ${SocialLinksFrag}
    query AuthorPageQuery($databaseId: ID!) {
        general: generalSettings {
            social {
                ...SocialLinksFrag
            }
        }

        pmenu: menuItems(where: { location: PRIMARY, parentId: 0 }) {
            nodes {
                ...PriMenuFrag
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

        fmenu: menuItems(where: { location: FOOTER, parentId: 0 }) {
            nodes {
                ...FooMenuFrag
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
