import { gql } from '@apollo/client';

export const LeaveCommentMutation = gql(`
    mutation LeaveCommentMutation($input: CreateCommentInput!) {
        createComment(input: $input) {
            success
            comment {
                id
                content
                author {
                    node {
                        name
                        email
                    }
                }
            }
        }
    }
`);

export const SubmitGfFormMutation = gql(`
    mutation SubmitGfFormMutation($input: SubmitGfFormInput!) {
        submitGfForm(input: $input) {
            confirmation {
                message
            }
            errors {
                message
            }
        }
    }
`);
