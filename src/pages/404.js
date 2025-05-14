import { gql } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';

import Layout from '@/components/Layout';
import Container from '@/components/Container';
import { PriMenuFrag, FooMenuFrag, SocialLinksFrag } from '@/graphql/general';

export default function Page404(props) {

    const { pmenu, fmenu, general } = props.data;

    const siteConfig = {
        primaryMenus: pmenu?.nodes || [],
        footerMenus: fmenu?.nodes || [],
        socialLinks: general?.social
    };

    return (
        <Layout config={siteConfig}>
            <Container className="mt-12 sm:mt-24">
                <header className="max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                        404
                    </h1>
                </header>
                <div className="mt-6 w-full text-zinc-600 prose dark:prose-invert dark:text-zinc-400">
                    <p>It looks like the page you're looking for has gone missing!</p>
                </div>
            </Container>
        </Layout>
    );
}

Page404.query = gql`
    ${PriMenuFrag}
    ${FooMenuFrag}
    ${SocialLinksFrag}
    query Page404Query {
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

        fmenu: menuItems(where: { location: FOOTER, parentId: 0 }) {
            nodes {
                ...FooMenuFrag
            }
        }
    }
`;

export function getStaticProps(ctx) {
    return getNextStaticProps(ctx, {
        Page: Page404
    });
}