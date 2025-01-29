import { gql } from "@apollo/client";
import Container from "@/components/container/container";
import Header from "@/components/header/header";
import Comment from "@/components/comment/comment";
import {
    PrimaryMenuFragment,
    PostCategoryFragment,
    PostTagFragment
} from "@/fragments/general";

export default function Single(props) {
    // Loading state for previews
    if (props.loading) {
        return <>Loading...</>;
    }

    const menuItems = props?.data?.primaryMenuItems?.nodes;
    const { title: siteTitle } = props?.data?.generalSettings;

    const {
        date: postDate,
        title: postTitle,
        author: postAuthor,
        content: postContent,
        tags: postTags,
        categories: postCategories,
        databaseId: postIdentifier
    } = props?.data?.post;

    return (
        <Container title={`${postTitle} - ${siteTitle}`}>
            <Header menuItems={menuItems} />
            <h1>{postTitle}</h1>
            <p>By {postAuthor?.node?.name}, on <time>{new Date(postDate).toDateString()}</time></p>
            <p>
                <strong>Categories: </strong>
                {postCategories.edges.map(item => item.node.name).join(", ")}
            </p>
            <p>
                <strong>Tags: </strong>
                {postTags.edges.map(item => item.node.name).join(", ")}
            </p>
            <div dangerouslySetInnerHTML={{ __html: postContent }} />
            <h3>Leave a Comment</h3>
            <Comment postId={postIdentifier} />
        </Container>
    );
}

Single.variables = ({ databaseId }, ctx) => {
    return {
        databaseId,
        asPreview: ctx?.asPreview,
    };
};

Single.query = gql`
    ${PrimaryMenuFragment}
    ${PostCategoryFragment}
    ${PostTagFragment}
    query PostPageQuery($databaseId: ID!, $asPreview: Boolean = false) {
        generalSettings {
            title
            description
        }

        primaryMenuItems: menuItems(where: { location: PRIMARY, parentId: 0 }) {
            nodes {
                ...PrimaryMenuFragment
                childItems {
                    nodes {
                       ...PrimaryMenuFragment 
                    }
                }
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
                    databaseId
                }
            }
            categories {
                ...PostCategoryFragment
            }
            tags {
                ...PostTagFragment
            }
        }
    }
`;
