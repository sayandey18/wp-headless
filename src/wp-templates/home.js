import Head from 'next/head';
import Link from 'next/link';
import parse from 'html-react-parser';
import { gql } from '@apollo/client';

import Header from '@/components/Header';
import Photos from '@/components/Photos';
import Ribbon from '@/components/Ribbon';
import Container from '@/components/Container';
import ArticleCard from '@/components/ArticleCard';
import Experience from '@/components/Experience';
import Newsletter from '@/components/Newsletter';
import LatestProjects from '@/components/LatestProjects';
import Reviews from '@/components/Reviews';
import { BlurFade } from '@/components/MagicUi';

import { PrimaryMenuFrag, GfNewsletterFrag } from '@/graphql/general';

import {
    GitHubIcon,
    InstagramIcon,
    LinkedInIcon,
    TwitterIcon
} from '@/components/SocialIcons';

function SocialLink({ icon: Icon, ...props }) {
    return (
        <Link className="group -m-1 p-1" {...props}>
            <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
        </Link>
    );
}

export default function HomePage(props) {
    const { data, loading } = props;

    // Loading state for previews
    if (loading) {
        return <>Loading...</>;
    }

    const menuItems = data?.menus?.nodes || [];
    const gfFormData = data?.gfForm;
    const pageSeoMeta = data?.page?.seo;
    const latestPosts = data?.posts?.nodes;

    return (
        <>
            <Head>{pageSeoMeta && parse(pageSeoMeta?.fullHead)}</Head>
            <BlurFade delay={0.25} duration={0.5}>
                <Header menu={menuItems} />
            </BlurFade>

            <Container className="mt-9">
                <div className="max-w-xl">
                    <BlurFade delay={0.25} duration={0.5}>
                        <h1 className="text-4xl leading-16 font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                            Web Developer and{' '}
                            <Ribbon className="bg-yellow-300">
                                JavaScript
                            </Ribbon>{' '}
                            Enthusiast.
                        </h1>
                    </BlurFade>

                    <BlurFade delay={0.35} duration={0.5}>
                        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                            I&apos;m Sayan, a full-stack web developer and
                            entrepreneur based in Kolkata, India. I&apos;m the
                            founder and CEO of Zappz Group, where we develop
                            technologies that empower regular people to explore
                            space on their own terms.
                        </p>
                        <div className="mt-6 flex gap-6">
                            <SocialLink
                                href="https://twitter.com"
                                aria-label="Follow on Twitter"
                                icon={TwitterIcon}
                            />
                            <SocialLink
                                href="https://instagram.com"
                                aria-label="Follow on Instagram"
                                icon={InstagramIcon}
                            />
                            <SocialLink
                                href="https://github.com"
                                aria-label="Follow on GitHub"
                                icon={GitHubIcon}
                            />
                            <SocialLink
                                href="https://linkedin.com"
                                aria-label="Follow on LinkedIn"
                                icon={LinkedInIcon}
                            />
                        </div>
                    </BlurFade>
                </div>
            </Container>

            <BlurFade delay={0.55} duration={0.5}>
                <Photos />
            </BlurFade>

            <Container className="mt-24 md:mt-28">
                <BlurFade delay={0.25} duration={0.5} inView>
                    <LatestProjects />
                </BlurFade>
                <BlurFade delay={0.25} duration={0.5} inView>
                    <div className="mx-auto mt-12 grid max-w-xl grid-cols-1 gap-y-12 lg:mt-18 lg:max-w-none lg:grid-cols-2 lg:gap-y-18">
                        <div className="flex flex-col gap-12 lg:gap-18">
                            {latestPosts &&
                                latestPosts.map((article) => (
                                    <ArticleCard
                                        key={article?.id}
                                        article={article}
                                    />
                                ))}
                        </div>
                        <div className="lg:pl-16 xl:pl-24">
                            <div className="space-y-10 self-start lg:sticky lg:top-20">
                                <Newsletter form={gfFormData} />
                                <Experience />
                            </div>
                        </div>
                    </div>
                </BlurFade>

                <BlurFade delay={0.25} duration={0.5} inView>
                    <Reviews />
                </BlurFade>
            </Container>
        </>
    );
}

HomePage.query = gql`
    ${PrimaryMenuFrag}
    ${GfNewsletterFrag}
    query FrontPageQuery($gfFormId: ID!) {
        menus: menuItems(where: { location: PRIMARY, parentId: 0 }) {
            nodes {
                ...PrimaryMenuFrag
            }
        }

        page(id: "/", idType: URI) {
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

        gfForm(id: $gfFormId, idType: DATABASE_ID) {
            title
            databaseId
            description
            hasHoneypot
            submitButton {
                text
            }
            formFields {
                ...GfNewsletterFrag
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
