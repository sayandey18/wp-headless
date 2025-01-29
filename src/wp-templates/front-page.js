import { gql } from "@apollo/client";
import Container from "@/components/container/container";
import Header from "@/components/header/header";
import { PrimaryMenuFragment } from "@/fragments/general";

export default function FrontPage(props) {
    // Loading state for previews
    if (props.loading) {
        return <>Loading...</>;
    }

    const menuItems = props?.data?.primaryMenuItems?.nodes;
    const { title: siteTitle, description: siteDescription } = 
    props.data.generalSettings

    const socialHandle = props?.data?.acfSocialHandles;


    return (
        <Container title={siteTitle}>
            <Header menuItems={menuItems} />
            <h2>{siteTitle}</h2>
            <p>{siteDescription}</p>
        </Container>
    );
}

FrontPage.query = gql`
    ${PrimaryMenuFragment}
    query FrontPageQuery {
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

        acfSocialHandles {
            socialHandles {
                acfSocialFacebook
                acfSocialInstagram
                acfSocialTwitter
            }
        }
    }
`;

