import { gql } from "@apollo/client";
import Container from "@/components/container/container";
import Header from "@/components/header/header";
import { PrimaryMenuFragment } from "@/fragments/general";

export default function Page(props) {
    // Loading state for previews
    if (props.loading) {
        return <>Loading...</>;
    }

    const menuItems = props?.data?.primaryMenuItems?.nodes;
    const { title: siteTitle } = props?.data?.generalSettings;
    const { title: pageTitle, content: pageContent } = props.data.page;

    return (
        <Container title={`${pageTitle} - ${siteTitle}`}>
            <Header menuItems={menuItems} />
            <h1>{pageTitle}</h1>
            <div dangerouslySetInnerHTML={{ __html: pageContent }} />
        </Container>
    );
}

Page.variables = ({ databaseId }, ctx) => {
    return {
        databaseId,
        asPreview: ctx?.asPreview,
    };
};

Page.query = gql`
    ${PrimaryMenuFragment}
    query PageQuery($databaseId: ID!, $asPreview: Boolean = false) {
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

        page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
            title
            content
        }
    }
`;