import { gql } from '@apollo/client';
import Header from '@/components/Header';
import PageLayout from '@/components/PageLayout';
import { BlurFade } from '@/components/MagicUi';

import { PrimaryMenuFrag } from '@/graphql/general';

export default function Page(props) {
    const { data, loading } = props;

    // Loading state for previews
    if (loading) {
        return <>Loading...</>;
    }

    const menuItems = data?.menus?.nodes || [];
    const pageContent = data?.page?.content;

    const pageEntry = {
        title: data?.page?.title,
        yoast: data?.page?.seo?.fullHead
    };

    return (
        <BlurFade delay={0.25} duration={0.5}>
            <Header menu={menuItems} />
            <PageLayout page={pageEntry}>{pageContent}</PageLayout>
        </BlurFade>
    );
}

Page.query = gql`
    ${PrimaryMenuFrag}
    query PageQuery($databaseId: ID!, $asPreview: Boolean = false) {
        menus: menuItems(where: { location: PRIMARY, parentId: 0 }) {
            nodes {
                ...PrimaryMenuFrag
            }
        }

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
