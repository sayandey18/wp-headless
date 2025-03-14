import { gql } from '@apollo/client';
import PageLayout from '@/components/PageLayout';

export default function Page(props) {
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

Page.query = gql`
    query PageQuery($databaseId: ID!, $asPreview: Boolean = false) {
        page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
            title
            content
            seo {
                fullHead
            }
        }
    }
`;

Page.variables = ({ databaseId }, ctx) => {
    return {
        databaseId,
        asPreview: ctx?.asPreview
    };
};
