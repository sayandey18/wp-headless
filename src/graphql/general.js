import { gql } from '@apollo/client';

export const PrimaryMenuFrag = gql(`
    fragment PrimaryMenuFrag on MenuItem {
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
