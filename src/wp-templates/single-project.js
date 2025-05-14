import { gql } from '@apollo/client';

import Prose from '@/components/Prose';
import Layout from '@/components/Layout';
import ArticleLayout from '@/components/ArticleLayout';

import { PriMenuFrag, FooMenuFrag, SocialLinksFrag } from '@/graphql/general';

export default function SingleProject(props) {
    if (props.loading) {
        return <>Loading...</>;
    }

    const { pmenu, fmenu, project, general } = props.data;
    const postContent = project?.content;

    const siteConfig = {
        metaData: project?.seo?.fullHead,
        primaryMenus: pmenu?.nodes || [],
        footerMenus: fmenu?.nodes || [],
        socialLinks: general?.social
    };

    const entryHeader = {
        postDate: project?.date,
        postTitle: project?.title,
        postContent: project?.content,
        postAuthor: {
            authorName: project?.author?.node?.name,
            authorImg: project?.author?.node?.avatar?.url
        }
    };

    return (
        <Layout config={siteConfig}>
            <ArticleLayout entry={entryHeader}>
                <Prose className="mt-8">{postContent}</Prose>
            </ArticleLayout>
        </Layout>
    );
}

SingleProject.query = gql`
    ${PriMenuFrag}
    ${FooMenuFrag}
    ${SocialLinksFrag}
    query SingleProjectQuery($databaseId: ID!, $asPreview: Boolean = false) {
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

        project(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
            date
            title
            content
            author {
                node {
                    name
                    avatar(size: 50) {
                        url
                    }
                }
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

SingleProject.variables = ({ databaseId }, ctx) => {
    return {
        databaseId,
        asPreview: ctx?.asPreview
    };
};
