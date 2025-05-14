import Link from 'next/link';
import { gql } from '@apollo/client';

import Layout from '@/components/Layout';
import PageLayout from '@/components/PageLayout';
import ArticleList from '@/components/ArticleList';
import ArticleSkeleton from '@/components/ArticleSkeleton';

import { PriMenuFrag, FooMenuFrag, SocialLinksFrag } from '@/graphql/general';

export default function ArchiveProjects(props) {
    const { pmenu, fmenu, node, general } = props.data;

    const recentProjects = node?.contentNodes;
    const siteConfig = {
        metaData: node?.seo?.fullHead,
        primaryMenus: pmenu?.nodes || [],
        footerMenus: fmenu?.nodes || [],
        socialLinks: general?.social
    };

    const entryHeader = {
        pageTitle: node?.label
    };

    return (
        <Layout config={siteConfig}>
            <PageLayout entry={entryHeader}>
                <div className="mt-6 w-full text-zinc-600 prose dark:prose-invert dark:text-zinc-400">
                    <ul>
                        {recentProjects.nodes.map((node) => (
                            <li>
                                <Link href={node.uri}>{node.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <ArticleList />
                <ArticleSkeleton />
            </PageLayout>
        </Layout>
    );
}

ArchiveProjects.query = gql`
    ${PriMenuFrag}
    ${FooMenuFrag}
    ${SocialLinksFrag}
    query ArchiveProjectsQuery($uri: String!) {
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

        fmenu: menuItems(where: { location: FOOTER, parentId: 0 }) {
            nodes {
                ...FooMenuFrag
            }
        }

        node: nodeByUri(uri: $uri) {
			... on ContentType {
				label
				description
				contentNodes {
					nodes {
						id
						uri
						... on NodeWithTitle {
							title
						}
					}
				}
                seo {
                    fullHead
                }
			}
		}
    }
`;

ArchiveProjects.variables = (seedQuery) => {
    return {
        uri: seedQuery.uri,
    };
};