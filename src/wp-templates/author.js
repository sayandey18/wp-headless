import { gql } from "@apollo/client";
import Image from "next/image";
import Container from "@/components/container/container";
import Header from "@/components/header/header";
import { PrimaryMenuFragment } from "@/fragments/general";

export default function Author(props) {
    const menuItems = props?.data?.primaryMenuItems?.nodes;
    const { title: siteTitle } = props?.data?.generalSettings;
    const { name: authorName, avatar: authorAvater, description: authorInfo } = props?.data?.user;

    return (
        <Container title={`${authorName} - ${siteTitle}`}>
            <Header menuItems={menuItems} />
            <div>
                <div>
                    <Image
                        src={authorAvater?.url}
                        alt={authorName}
                        width={100}
                        height={100}
                    />
                </div>
                <div>
                    <h1>{authorName}</h1>
                    <p>{authorInfo}</p>
                </div>
            </div>
        </Container>
    );
}

Author.variables = ({ databaseId }, ctx) => {
    return {
        databaseId,
        asPreview: ctx?.asPreview,
    };
};

Author.query = gql`
    ${PrimaryMenuFragment}
    query AuthorPageQuery($databaseId: ID!) {
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

        user(id: $databaseId, idType: DATABASE_ID) {
            name
            description
            avatar(size: 100) {
                url
            }
        }
    }
`;