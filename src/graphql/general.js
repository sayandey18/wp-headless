import { gql } from '@apollo/client';

export const PriMenuFrag = gql(`
    fragment PriMenuFrag on MenuItem {
        id
        uri
        path
        label
        target
        databaseId
    }
`);

export const FooMenuFrag = gql(`
    fragment FooMenuFrag on MenuItem {
        id
        uri
        path
        label
        target
        databaseId
    }
`);

export const PostTagFrag = gql(`
    fragment PostTagFrag on PostToTagConnection {
        edges {
            node {
                name
                databaseId
            }
        }
    } 
`);

export const PostListItemFrag = gql(`
    fragment PostListItemFrag on Post {
        id
        title
        date
        excerpt
        slug
        featuredImage {
            node {
                sourceUrl
                altText
            }
        }
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
`);

export const GfNewsletterFrag = gql(`
    fragment GfNewsletterFrag on GfFormToFormFieldConnection {
        edges {
            node {
                databaseId
                inputType
                ... on EmailField {
                    placeholder
                    inputType
                    isRequired
                }
            }
        }
    }
`);

export const GfContactFormFrag = gql(`
    fragment GfContactFormFrag on GfFormToFormFieldConnection {
        edges {
            node {
                databaseId
                ... on TextField {
                    label
                    inputType
                    isRequired
                }
                ... on EmailField {
                    label
                    inputType
                    isRequired
                }
                ... on MultiChoiceField {
                    label
                    inputType
                    isRequired
                    choices {
                        text
                        value
                        isSelected
                    }
                }
                ... on TextAreaField {
                    label
                    cssClass
                    inputType
                    isRequired
                }
            }
        }
    }
`);

export const SocialLinksFrag = gql(`
    fragment SocialLinksFrag on Social {
        github
        bluesky
        twitter
        linkedin
    }
`);
