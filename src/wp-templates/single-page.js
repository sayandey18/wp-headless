import { gql } from '@apollo/client';
import Prose from '@/components/Prose';
import Layout from '@/components/Layout';
import PageLayout from '@/components/PageLayout';

import { PriMenuFrag, FooMenuFrag, SocialLinksFrag } from '@/graphql/general';

export default function SinglePage(props) {
    if (props.loading) {
        return <>Loading...</>;
    }

    const { pmenu, fmenu, page, general } = props.data;
    const pageContent = page?.content;

    const siteConfig = {
        metaData: page?.seo?.fullHead,
        primaryMenus: pmenu?.nodes || [],
        footerMenus: fmenu?.nodes || [],
        socialLinks: general?.social
    };

    const entryHeader = {
        pageTitle: page?.title
    };

    return (
        <Layout config={siteConfig}>
            <PageLayout entry={entryHeader}>
                <Prose className="mt-8">{pageContent}</Prose>
            </PageLayout>
        </Layout>
    );
}

SinglePage.query = gql`
    ${PriMenuFrag}
    ${FooMenuFrag}
    ${SocialLinksFrag}
    query SinglePageQuery($databaseId: ID!, $asPreview: Boolean = false) {
        general: generalSettings {
            social {
                ...SocialLinksFrag
            }
        }

        pmenu: menuItems(where: { location: PRIMARY, parentId: 0 }) {
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

        fmenu: menuItems(where: { location: FOOTER, parentId: 0 }) {
            nodes {
                ...FooMenuFrag
            }
        }
    }
`;

SinglePage.variables = ({ databaseId }, ctx) => {
    return {
        databaseId,
        asPreview: ctx?.asPreview
    };
};
