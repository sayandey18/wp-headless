import { gql } from '@apollo/client';
import { PostTagFrag } from '@/graphql/general';

import Prose from '@/components/Prose';
import EntryHeader from '@/components/EntryHeader';
import ArticleLayout from '@/components/ArticleLayout';

export default function Single(props) {
    const {
        data: { post },
        loading
    } = props;

    // Loading state for previews
    if (loading) {
        return <>Loading...</>;
    }

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
        <ArticleLayout post={postEntry}>
            <EntryHeader header={postHeader} />
            <Prose className="mt-8">{postContent}</Prose>
        </ArticleLayout>
    );
}

Single.query = gql`
    ${PostTagFrag}
    query PostPageQuery($databaseId: ID!, $asPreview: Boolean = false) {
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
