import { gql } from '@apollo/client';

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
