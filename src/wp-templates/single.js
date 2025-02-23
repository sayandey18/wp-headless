import { gql } from '@apollo/client';

import Prose from '@/components/Prose';
import Header from '@/components/Header';
import EntryHeader from '@/components/EntryHeader';
import ArticleLayout from '@/components/ArticleLayout';
import { BlurFade } from '@/components/MagicUi';

import { PrimaryMenuFrag, PostTagFrag } from '@/graphql/general';

export default function Single(props) {
    const {
        data: { post, menus },
        loading
    } = props;

    // Loading state for previews
    if (loading) {
        return <>Loading...</>;
    }

    const menuItems = menus?.nodes || [];
    const postContent = post?.content;

    const postEntry = {
        title: post?.title,
        yoast: post?.seo?.fullHead
    };

    const postHeader = {
        date: post?.date,
        content: post?.content,
        author: {
            name: post?.author?.node?.name,
            avatar: post?.author?.node?.avatar
        }
    };

    return (
        <BlurFade delay={0.25} duration={0.5}>
            <Header menu={menuItems} />
            <ArticleLayout post={postEntry}>
                <EntryHeader header={postHeader} />
                <Prose className="mt-8">{postContent}</Prose>
            </ArticleLayout>
        </BlurFade>
    );
}

Single.query = gql`
    ${PostTagFrag}
    ${PrimaryMenuFrag}
    query PostPageQuery($databaseId: ID!, $asPreview: Boolean = false) {
        menus: menuItems(where: { location: PRIMARY, parentId: 0 }) {
            nodes {
                ...PrimaryMenuFrag
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
            tags {
                ...PostTagFrag
            }
            seo {
                fullHead
            }
        }
    }
`;

Single.variables = ({ databaseId }, ctx) => {
    return {
        databaseId,
        asPreview: ctx?.asPreview
    };
};
