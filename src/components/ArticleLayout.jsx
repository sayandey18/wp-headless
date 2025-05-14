import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import readingDuration from 'reading-duration';

import Container from '@/components/Container';
import { ArrowLeft } from '@/components/SimpleIcons';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export default function ArticleLayout({ entry, children }) {
    const router = useRouter();
    const { authorName, authorImg } = entry?.postAuthor;

    return (
        <Container className="mt-8 lg:mt-24">
            <div className="xl:relative">
                <div className="mx-auto max-w-2xl">
                    {usePrevious && (
                        <button
                            type="button"
                            onClick={() => router.back()}
                            aria-label="Go back"
                            className="group mb-8 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
                        >
                            <ArrowLeft className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
                        </button>
                    )}
                    <article>
                        <header className="flex flex-col">
                            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                                {entry?.postTitle}
                            </h1>
                        </header>

                        <div className="mt-8 flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={authorImg}
                                    alt={authorName}
                                    height={25}
                                    width={25}
                                    sizes="20vw"
                                    priority={false}
                                    className="rounded-full"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-300">
                                    {authorName}
                                    {' / '}
                                    {entry?.postDate
                                        ? new Date(
                                            entry.postDate
                                        ).toDateString()
                                        : ''}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-xs text-gray-500 md:mt-0 dark:text-gray-300">
                                    {'Time: '}
                                    {entry?.postContent
                                        ? readingDuration(entry.postContent)
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>
                        {children && children}
                    </article>
                </div>
            </div>
        </Container>
    );
}
