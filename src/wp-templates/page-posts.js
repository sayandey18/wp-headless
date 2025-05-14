import { gql } from '@apollo/client';

import Prose from '@/components/Prose';
import Layout from '@/components/Layout';
import PageLayout from '@/components/PageLayout';
import ArticleList from '@/components/ArticleList';

import { PriMenuFrag, FooMenuFrag, SocialLinksFrag } from '@/graphql/general';


function calculateDays(date) {
    const getDate = new Date(date);
    const nowDate = new Date();
    const diffTime = Math.abs(nowDate.getTime() - getDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
        return `${diffDays} days ago`;
    } else {
        const diffMonths = Math.floor(diffDays / 30)
        return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
    }
}

export default function PostsPage(props) {
    if (props.loading) {
        return <>Loading...</>;
    }

    const { pmenu, fmenu, page, general } = props.data;
    const pageContent = page?.content;

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
            <PageLayout
                entry={entryHeader}
                className="max-w-5xl mx-auto">
                <Prose className="mt-8">{pageContent}</Prose>
                <ArticleList />
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

        posts(first: 2) {
            nodes {
                id
                title
                date
                excerpt
                slug
                categories {
                    nodes {
                        name
                        slug
                    }
                }
                author {
                    node {
                        name
                        avatar {
                            url
                        }
                    }
                }
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
