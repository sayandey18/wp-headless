export default function ArticleSkeleton() {
    return (
        <div className="space-y-8">
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className={`pb-8 ${index !== 2 ? 'border-b border-zinc-200/70 dark:border-zinc-700/60' : ''}`}
                >
                    <div className="flex flex-col items-start gap-6 lg:flex-row lg:justify-between">
                        <div className="w-full lg:w-2/5">
                            <div className="h-[234px] w-full animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                        </div>

                        <div className="w-full lg:w-3/5">
                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center justify-start gap-3">
                                    {[...Array(2)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-6 w-20 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700"
                                        />
                                    ))}
                                </div>
                                <div className="h-5 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                            </div>
                            <div className="relative mt-6">
                                <div className="mb-2 h-8 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                                <div className="mb-4 h-16 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="mr-2 h-8 w-8 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
                                        <div className="h-5 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                                    </div>
                                    <div className="h-6 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
