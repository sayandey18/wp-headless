import { gql } from '@apollo/client';

import Prose from '@/components/Prose';
import Layout from '@/components/Layout';
import ArticleLayout from '@/components/ArticleLayout';

import { PriMenuFrag, FooMenuFrag, SocialLinksFrag } from '@/graphql/general';

export default function SinglePost(props) {
    if (props.loading) {
        return <>Loading...</>;
    }

    const { pmenu, fmenu, post, general } = props.data;
    const postContent = post?.content;

    const siteConfig = {
        metaData: post?.seo?.fullHead,
        primaryMenus: pmenu?.nodes || [],
        footerMenus: fmenu?.nodes || [],
        socialLinks: general?.social
    };

    const entryHeader = {
        postDate: post?.date,
        postTitle: post?.title,
        postContent: post?.content,
        postAuthor: {
            authorName: post?.author?.node?.name,
            authorImg: post?.author?.node?.avatar?.url
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

SinglePost.query = gql`
    ${PriMenuFrag}
    ${FooMenuFrag}
    ${SocialLinksFrag}
    query SinglePostQuery($databaseId: ID!, $asPreview: Boolean = false) {
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

        post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
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

SinglePost.variables = ({ databaseId }, ctx) => {
    return {
        databaseId,
        asPreview: ctx?.asPreview
    };
};
