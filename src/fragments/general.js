import { gql } from "@apollo/client";

export const PrimaryMenuFragment = gql(`
    fragment PrimaryMenuFragment on MenuItem {
        id
        uri
        path
        label
        target
        databaseId
    }
`);

export const PostCategoryFragment = gql(`
    fragment PostCategoryFragment on PostToCategoryConnection {
        edges {
            node {
                name
                databaseId
            }
        }
    } 
`);

export const PostTagFragment = gql(`
    fragment PostTagFragment on PostToTagConnection {
        edges {
            node {
                name
                databaseId
            }
        }
    } 
`);