import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useDebounce } from 'use-debounce';

import ArticleSkeleton from '@/components/ArticleSkeleton';
import {
    ArrowRight,
    PaperClip,
    SearchIcon,
    CloseIcon
} from '@/components/SimpleIcons';
import { PostListItemFrag } from '@/graphql/general';

const GET_POSTS = gql`
    ${PostListItemFrag}
    query GetPosts($first: Int!, $after: String, $search: String) {
        posts(first: $first, after: $after, where: { search: $search }) {
            pageInfo {
                hasNextPage
                endCursor
            }
            nodes {
                ...PostListItemFrag
            }
        }
    }
`;

function calculateDays(date) {
    const getDate = new Date(date);
    const nowDate = new Date();
    const diffTime = Math.abs(nowDate.getTime() - getDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
        return `${diffDays} days ago`;
    } else {
        const diffMonths = Math.floor(diffDays / 30);
        return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
    }
}

function ArticleCard({ post, isLast }) {
    return (
        <article
            key={post.id}
            className={`pb-8 ${!isLast ? 'border-b border-zinc-200/70 dark:border-zinc-700/60' : ''}`}
        >
            <div className="flex flex-col items-start gap-6.5 lg:flex-row lg:justify-between">
                <div className="w-full lg:w-2/5">
                    {post.featuredImage?.node ? (
                        <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.featuredImage.node.altText}
                            width={416}
                            height={234}
                            loading="lazy"
                            className="h-[234px] w-full rounded-xl border border-zinc-100 object-cover dark:border-zinc-700/40"
                        />
                    ) : (
                        <Image
                            src="/assets/images/placeholder.svg"
                            alt={`Placeholder for ${post.id}`}
                            width={416}
                            height={234}
                            loading="lazy"
                            className="h-[234px] w-full rounded-xl border border-zinc-100 object-cover dark:border-zinc-700/40"
                        />
                    )}
                </div>
                <div className="w-full lg:w-3/5">
                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {post.categories?.nodes
                                ?.slice(0, 3)
                                .map((category, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center rounded-full border border-fuchsia-200 bg-fuchsia-100 px-3 py-1 text-[12px] font-medium text-fuchsia-500"
                                    >
                                        <PaperClip className="mr-1.5 h-3.5 w-3.5" />{' '}
                                        {category.name}
                                    </div>
                                ))}
                        </div>
                        <span className="text-sm text-zinc-500">
                            {calculateDays(post.date)}
                        </span>
                    </div>
                    <div className="relative mt-5">
                        <h2 className="mb-2 text-2xl font-bold text-zinc-800 lg:line-clamp-1 dark:text-zinc-100">
                            {post.title}
                        </h2>
                        <div
                            className="mb-4 text-zinc-600 lg:line-clamp-2 xl:line-clamp-3 dark:text-zinc-400"
                            dangerouslySetInnerHTML={{ __html: post.excerpt }}
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {post.author?.node?.avatar?.url ? (
                                    <Image
                                        src={post.author.node.avatar.url}
                                        alt={post.author.node.name}
                                        width={30}
                                        height={30}
                                        className="mr-2 rounded-full"
                                    />
                                ) : (
                                    <div className="mr-2 h-8 w-8 rounded-full bg-zinc-200"></div>
                                )}
                                <span className="text-base font-medium text-zinc-800 dark:text-zinc-100">
                                    {post.author?.node?.name ||
                                        'Unknown author'}
                                </span>
                            </div>
                            <Link
                                href={post.slug}
                                className="flex items-center font-medium text-fuchsia-500 hover:underline dark:text-fuchsia-400"
                            >
                                Read more{' '}
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function ArticleList({ postsPerPage = 5 }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loadMoreRef = useRef(null);

    const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
        variables: {
            first: postsPerPage,
            after: null,
            search: debouncedSearchTerm || null
        },
        notifyOnNetworkStatusChange: true,
        errorPolicy: 'all'
    });

    useEffect(() => {
        if (data?.posts?.nodes) {
            setLoadedPosts(data.posts.nodes);
            setIsSearching(false);
        }
    }, [data?.posts?.nodes]);

    const loadMorePosts = useCallback(() => {
        if (!data?.posts?.pageInfo?.hasNextPage) return;
        setIsLoadingMore(true);
        fetchMore({
            variables: {
                first: postsPerPage,
                after: data.posts.pageInfo.endCursor,
                search: debouncedSearchTerm || null
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                const existingIds = new Set(prev.posts.nodes.map((p) => p.id));
                const newPosts = fetchMoreResult.posts.nodes.filter(
                    (p) => !existingIds.has(p.id)
                );
                setLoadedPosts((prev) => [...prev, ...newPosts]);
                return {
                    ...prev,
                    posts: {
                        ...fetchMoreResult.posts,
                        nodes: [...prev.posts.nodes, ...newPosts]
                    }
                };
            }
        }).finally(() => setIsLoadingMore(false));
    }, [data, debouncedSearchTerm, fetchMore, postsPerPage]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (
                    entry.isIntersecting &&
                    !isLoadingMore &&
                    !debouncedSearchTerm &&
                    data?.posts?.pageInfo?.hasNextPage
                ) {
                    loadMorePosts();
                }
            },
            { rootMargin: '100px', threshold: 0.1 }
        );
        const ref = loadMoreRef.current;
        if (ref) observer.observe(ref);
        return () => ref && observer.unobserve(ref);
    }, [
        loadMorePosts,
        debouncedSearchTerm,
        isLoadingMore,
        data?.posts?.pageInfo?.hasNextPage
    ]);

    return (
        <div className="mt-4 lg:mt-8">
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsSearching(true);
                    }}
                    className="w-full rounded-lg border px-12 py-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
                <div className="absolute top-1/2 left-3 -translate-y-1/2 transform text-zinc-400 dark:text-zinc-500">
                    <SearchIcon className="h-5 w-5" />
                </div>

                {searchTerm && (
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setIsSearching(false);
                        }}
                        className="absolute top-2/4 right-3 -translate-y-1/2 cursor-pointer text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    >
                        <CloseIcon className="h-5 w-5" />
                    </button>
                )}
                {isSearching && (
                    <span className="absolute top-2/4 right-10 -translate-y-1/2 animate-spin text-fuchsia-500">
                        &#9696;
                    </span>
                )}
            </div>

            {loading && !isLoadingMore && <ArticleSkeleton />}

            {error && (
                <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
                    <p>Error loading posts: {error.message}</p>
                </div>
            )}

            {!loading && !loadedPosts.length && (
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-center text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    <p>
                        {debouncedSearchTerm
                            ? `No posts found matching "${debouncedSearchTerm}"`
                            : 'No posts found, check back later for updates.'}
                    </p>
                </div>
            )}

            <div className="mt-8 space-y-8 lg:mt-16">
                {loadedPosts.map((post, idx) => (
                    <ArticleCard
                        key={post.id}
                        post={post}
                        isLast={idx === loadedPosts.length - 1}
                    />
                ))}
                {!debouncedSearchTerm && data?.posts?.pageInfo?.hasNextPage && (
                    <div
                        ref={loadMoreRef}
                        className="flex min-h-[50px] items-center justify-center py-4"
                    >
                        {isLoadingMore && (
                            <span className="animate-spin text-fuchsia-500">
                                &#9696;
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
