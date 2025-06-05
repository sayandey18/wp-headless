import { useState } from 'react';
import { gql } from '@apollo/client';

import Prose from '@/components/Prose';
import Layout from '@/components/Layout';
import ArticleLayout from '@/components/ArticleLayout';
import CommentBox from '@/components/Comment/CommentBox';
import CommentList from '@/components/Comment/CommentList';

import { PriMenuFrag, FooMenuFrag, SocialLinksFrag } from '@/graphql/general';

export default function SinglePost(props) {
    const [replyTo, setReplyTo] = useState(null);

    if (props.loading) {
        return <>Loading...</>;
    }

    const { pmenu, fmenu, post, general } = props.data;
    const postContent = post?.content;
    const databaseId = post?.databaseId;
    const postComments = post?.comments?.nodes || [];

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
                <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-700/40">
                    <CommentList comments={postComments} onReply={setReplyTo} />
                    <CommentBox
                        id={databaseId}
                        parentId={replyTo?.id}
                        onSuccess={() => setReplyTo(null)}
                    />
                </div>
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
            databaseId
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
            commentCount
            comments {
                nodes {
                    id
                    databaseId
                    content
                    date
                    status
                    parentId
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
