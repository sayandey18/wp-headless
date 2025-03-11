import { gql } from '@apollo/client';
import Header from '@/components/Header';
import PageLayout from '@/components/PageLayout';
import { BlurFade } from '@/components/MagicUi';

import { PriMenuFrag, GfContactFormFrag } from '@/graphql/general';

export default function ContactPage(props) {
    if (props.loading) {
        return <>Loading...</>;
    }

    const { menu, page } = props.data;
    const menuItems = menu?.nodes;
    const pageContent = page?.content;

    const pageEntry = {
        pageTitle: page?.title,
        metaData: page?.seo?.fullHead
    };

    return (
        <BlurFade delay={0.25} duration={0.5}>
            <Header menu={menuItems} />
            <PageLayout entry={pageEntry}>{pageContent}</PageLayout>
        </BlurFade>
    );
}

ContactPage.query = gql`
    ${PriMenuFrag}
    ${GfContactFormFrag}
    query PageQuery($databaseId: ID!, $asPreview: Boolean = false) {
        menu: menuItems(where: { location: PRIMARY, parentId: 0 }) {
            nodes {
                ...PriMenuFrag
            }
        }

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
