import Head from 'next/head';
import Link from 'next/link';
import parse from 'html-react-parser';
import { gql } from '@apollo/client';
import { GfNewsletterFrag } from '@/graphql/general';

import Photos from '@/components/Photos';
import Ribbon from '@/components/Ribbon';
import Container from '@/components/Container';
import ArticleCard from '@/components/ArticleCard';
import Experience from '@/components/Experience';
import Newsletter from '@/components/Newsletter';
import LatestProjects from '@/components/LatestProjects';

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

    const gfFormData = data?.gfForm;
    const pageSeoMeta = data?.page?.seo;
    const latestPosts = data?.posts?.nodes;

    return (
        <>
            <Head>{pageSeoMeta && parse(pageSeoMeta?.fullHead)}</Head>

            <Container className="mt-9">
                <div className="max-w-2xl">
                    <h1 className="text-4xl leading-16 font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                        Web Developer and{' '}
                        <Ribbon className="bg-yellow-300">JavaScript</Ribbon>{' '}
                        Enthusiast.
                    </h1>
                    <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                        I'm Sayan, a full-stack web developer and entrepreneur
                        based in Kolkata, India. I'm the founder and CEO of
                        Zappz Group, where we develop technologies that empower
                        regular people to explore space on their own terms.
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
                </div>
            </Container>
            <Photos />
            <Container className="mt-24 md:mt-28">
                <LatestProjects />
                <div className="mx-auto my-12 grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                    <div className="flex flex-col gap-16">
                        {latestPosts &&
                            latestPosts.map((article) => (
                                <ArticleCard
                                    key={article?.id}
                                    article={article}
                                />
                            ))}
                    </div>
                    <div className="space-y-10 lg:pl-16 xl:pl-24">
                        <Newsletter form={gfFormData} />
                        <Experience />
                    </div>
                </div>
            </Container>
        </>
    );
}

HomePage.query = gql`
    ${GfNewsletterFrag}
    query FrontPageQuery($gfFormId: ID!) {
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
        gfFormId: process.env.NEXT_PUBLIC_NEWSLETTER_GFID || 2
    };
};
