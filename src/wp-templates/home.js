import { gql } from '@apollo/client';

import Layout from '@/components/Layout';
import Photos from '@/components/Photos';
import Ribbon from '@/components/Ribbon';
import Container from '@/components/Container';
import ArticleCard from '@/components/ArticleCard';
import SocialHandle from '@/components/SocialHandle';
import Experience from '@/components/Experience';
import Newsletter from '@/components/Newsletter';
import LatestProjects from '@/components/LatestProjects';
import Reviews from '@/components/Reviews';

import {
    PriMenuFrag,
    FooMenuFrag,
    SocialLinksFrag,
    GfNewsletterFrag
} from '@/graphql/general';

export default function HomePage(props) {
    if (props.loading) {
        return <>Loading...</>;
    }

    const { pmenu, fmenu, page, posts, general } = props.data;

    const recentPosts = posts?.nodes;
    const socialLinks = general?.social;

    const siteConfig = {
        metaData: page?.seo?.fullHead,
        primaryMenus: pmenu?.nodes || [],
        footerMenus: fmenu?.nodes || [],
        socialLinks: general?.social
    };

    const gfForm = props.data?.gform;

    return (
        <Layout config={siteConfig}>
            <Container className="mt-9">
                <div className="max-w-xl">
                    <h1 className="text-5xl leading-16 font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                        Web Developer and{' '}
                        <Ribbon className="bg-yellow-300">JavaScript</Ribbon>{' '}
                        Enthusiast.
                    </h1>

                    <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                        I&apos;m Sayan, a full-stack web developer and
                        entrepreneur based in Kolkata, India. I&apos;m the
                        founder and CEO of Zappz Group, where we develop
                        technologies that empower regular people to explore
                        space on their own terms.
                    </p>

                    <div className="mt-6">
                        <SocialHandle social={socialLinks} />
                    </div>
                </div>
            </Container>
            <Photos />
            <Container className="mt-24 md:mt-28">
                <LatestProjects />
                <div className="mx-auto mt-12 grid max-w-xl grid-cols-1 gap-y-12 lg:mt-18 lg:max-w-none lg:grid-cols-2 lg:gap-y-18">
                    <div className="flex flex-col gap-12 lg:gap-18">
                        {recentPosts &&
                            recentPosts.map((article) => (
                                <ArticleCard
                                    key={article?.id}
                                    article={article}
                                />
                            ))}
                    </div>
                    <div className="lg:pl-16 xl:pl-24">
                        <div className="space-y-10 self-start lg:sticky lg:top-20">
                            <Newsletter form={gfForm} />
                            <Experience />
                        </div>
                    </div>
                </div>
                <Reviews />
            </Container>
        </Layout>
    );
}

HomePage.query = gql`
    ${PriMenuFrag}
    ${GfNewsletterFrag}
    ${SocialLinksFrag}
    ${FooMenuFrag}
    query FrontPageQuery($gfFormId: ID!) {
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

        page(id: "/", idType: URI) {
            id
            seo {
                fullHead
            }
        }

        posts {
            nodes {
                id
                date
                slug
                title
                excerpt
            }
        }

        gform: gfForm(id: $gfFormId, idType: DATABASE_ID) {
            title
            databaseId
            description
            submitButton {
                text
            }
            formFields {
                ...GfNewsletterFrag
            }
        }

        fmenu: menuItems(where: { location: FOOTER, parentId: 0 }) {
            nodes {
                ...FooMenuFrag
            }
        }
    }
`;

HomePage.variables = ({ databaseId }) => {
    return {
        databaseId,
        gfFormId: process.env.NEXT_PUBLIC_NEWSLETTER_GFID
    };
};
