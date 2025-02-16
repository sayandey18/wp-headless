import { gql } from '@apollo/client';
import { GfContactFormFrag } from '@/graphql/general';

import PageLayout from '@/components/PageLayout';

export default function ContactPage(props) {
    const { data, loading } = props;

    // Loading state for previews
    if (loading) {
        return <>Loading...</>;
    }

    const pageContent = data?.page?.content;

    const pageEntry = {
        title: data?.page?.title,
        yoast: data?.page?.seo?.fullHead
    };

    return <PageLayout page={pageEntry}>{pageContent}</PageLayout>;
}

ContactPage.query = gql`
    ${GfContactFormFrag}
    query PageQuery($databaseId: ID!, $asPreview: Boolean = false) {
        page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
            title
            content
            seo {
                fullHead
            }
        }

        gfForm(id: 2, idType: DATABASE_ID) {
            databaseId
            formFields {
                ...GfContactFormFrag
            }
        }
    }
`;

ContactPage.variables = ({ databaseId }, ctx) => {
    return {
        databaseId,
        asPreview: ctx?.asPreview
    };
};
