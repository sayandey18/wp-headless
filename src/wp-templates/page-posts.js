import { gql } from '@apollo/client';

import Prose from '@/components/Prose';
import Layout from '@/components/Layout';
import PageLayout from '@/components/PageLayout';
import ArticleList from '@/components/ArticleList';
import { PriMenuFrag, FooMenuFrag, SocialLinksFrag } from '@/graphql/general';

export default function PostsPage(props) {
    if (props.loading) {
        return <>Loading...</>;
    }

    const { pmenu, fmenu, page, general, settings } = props.data;
    const pageContent = page?.content;
    const postsPerPage = settings?.readingSettingsPostsPerPage;

    const siteConfig = {
        metaData: page?.seo?.fullHead,
        primaryMenus: pmenu?.nodes || [],
        footerMenus: fmenu?.nodes || [],
        socialLinks: general?.social
    };

    const entryHeader = {
        pageTitle: page?.title
    };

    return (
        <Layout config={siteConfig}>
            <PageLayout entry={entryHeader} className="mx-auto max-w-5xl">
                <Prose className="mt-8">{pageContent}</Prose>
                <ArticleList postsPerPage={postsPerPage} />
            </PageLayout>
        </Layout>
    );
}

PostsPage.query = gql`
    ${PriMenuFrag}
    ${FooMenuFrag}
    ${SocialLinksFrag}
    query PostsPageQuery($id: ID!, $asPreview: Boolean = false) {
        general: generalSettings {
            social {
                ...SocialLinksFrag
            }
        }

        settings: allSettings {
            readingSettingsPostsPerPage
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

        page(id: $id, idType: ID, asPreview: $asPreview) {
            title
            content
            seo {
                fullHead
            }
        }
    }
`;

PostsPage.variables = (seedQuery, ctx) => {
    return {
        id: seedQuery?.id,
        asPreview: ctx?.asPreview
    };
};
