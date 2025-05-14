import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight, PaperClip } from '@/components/SimpleIcons';

export default function ArticleList() {
    return (
        <div className="mt-8 lg:mt-16">
            <div className="space-y-8">
                {/* First Article */}
                <article className="border-b border-zinc-200/70 pb-8 dark:border-zinc-700/60">
                    <div className="flex flex-col gap-6 items-start lg:flex-row lg:justify-between">
                        <div className="w-full lg:w-2/5">
                            <Image
                                src="https://images.unsplash.com/photo-1741515277598-64b4da5d212a"
                                alt="Article"
                                width={500}
                                height={375}
                                loading="lazy"
                                className="rounded-xl w-full"
                            />
                        </div>

                        <div className="w-full lg:w-3/5">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center text-xs font-medium px-3 py-0.5 cursor-pointer rounded-full border bg-fuchsia-100 text-fuchsia-500 border-fuchsia-200">
                                    <PaperClip className="mr-1.5 h-3.5 w-3.5" /> Tutorial
                                </div>
                                <span className="text-sm text-zinc-500">12 days ago</span>
                            </div>
                            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-2 lg:line-clamp-1">How to quickly deploy a static website</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-4 lg:line-clamp-2 xl:line-clamp-3">
                                Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools
                                that even influence both web designers and developers.
                            </p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <Image
                                        src="/assets/images/sayan-dey.jpeg"
                                        alt="Michael Gouch"
                                        width={30}
                                        height={30}
                                        priority={false}
                                        loading="lazy"
                                        className="rounded-full mr-2"
                                    />
                                    <span className="text-base font-medium text-zinc-800 dark:text-zinc-100">Sayan Dey</span>
                                </div>
                                <Link href="#" className="flex items-center font-medium text-fuchsia-500 dark:text-fuchsia-400 hover:underline">
                                    Read more <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>

                <article className="border-b border-zinc-200/70 pb-8 dark:border-zinc-700/60">
                    <div className="flex flex-col gap-6 items-start lg:flex-row lg:justify-between">
                        <div className="w-full lg:w-2/5">
                            <Image
                                src="https://images.unsplash.com/photo-1741515277598-64b4da5d212a"
                                alt="Article"
                                width={500}
                                height={375}
                                loading="lazy"
                                className="rounded-xl w-full"
                            />
                        </div>

                        <div className="w-full lg:w-3/5">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center text-xs font-medium px-3 py-0.5 cursor-pointer rounded-full border bg-fuchsia-100 text-fuchsia-500 border-fuchsia-200">
                                    <PaperClip className="mr-1.5 h-3.5 w-3.5" /> Tutorial
                                </div>
                                <span className="text-sm text-zinc-500">12 days ago</span>
                            </div>
                            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-2 lg:line-clamp-1">How to quickly deploy a static website</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-4 lg:line-clamp-2 xl:line-clamp-3">
                                Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools
                                that even influence both web designers and developers influence both web designers and developers.
                            </p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <Image
                                        src="/assets/images/sayan-dey.jpeg"
                                        alt="Michael Gouch"
                                        width={30}
                                        height={30}
                                        priority={false}
                                        loading="lazy"
                                        className="rounded-full mr-2"
                                    />
                                    <span className="text-base font-medium text-zinc-800 dark:text-zinc-100">Sayan Dey</span>
                                </div>
                                <Link href="#" className="flex items-center font-medium text-fuchsia-500 dark:text-fuchsia-400 hover:underline">
                                    Read more <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>

                <article className="border-b border-zinc-200/70 pb-6 dark:border-zinc-700/60">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-sm font-medium bg-fuchsia-100 text-fuchsia-500 px-3 py-1 rounded-full">
                            <PaperClip className="mr-1.5 h-4 w-4" /> Tutorial
                        </div>
                        <span className="text-sm text-zinc-500">12 days ago</span>
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">How to quickly deploy a static website</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                        Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools
                        that even influence both web designers and developers influence both web designers and developers.
                    </p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Image
                                src="/assets/images/sayan-dey.jpeg"
                                alt="Michael Gouch"
                                width={35}
                                height={35}
                                priority={false}
                                className="rounded-full mr-3"
                            />
                            <span className="text-base font-medium text-zinc-800 dark:text-zinc-100">Sayan Dey</span>
                        </div>
                        <Link href="#" className="flex items-center font-medium text-fuchsia-500 dark:text-fuchsia-400 hover:underline">
                            Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </article>

                {/* Second Article */}
                <article className="border-b border-gray-100 pb-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="bg-fuchsia-100 text-fuchsia-600 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                            <PaperClip className="mr-1.5 h-4 w-4" /> Article
                        </div>
                        <span className="text-gray-500 text-sm">24 days ago</span>
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">Our first project with React</h2>
                    <p className="text-gray-600 mb-4">
                        Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools
                        that even influence both web designers and developers influence both web designers and developers.
                    </p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Image
                                src="/assets/images/sayan-dey.jpeg"
                                alt="Neil Sims"
                                width={40}
                                height={40}
                                className="rounded-full mr-3"
                            />
                            <span className="font-medium text-gray-900">Neil Sims</span>
                        </div>
                        <Link href="#" className="text-fuchsia-600 font-medium flex items-center hover:underline">
                            Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </article>

                {/* Third Article */}
                <article className="pb-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="bg-fuchsia-100 text-fuchsia-600 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                            <PaperClip className="mr-1.5 h-4 w-4" /> Article
                        </div>
                        <span className="text-gray-500 text-sm">2 months ago</span>
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">Those HTML attributes you never use</h2>
                    <p className="text-gray-600 mb-4">
                        Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools
                        that even influence both web designers and developers influence both web designers and developers.
                    </p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Image
                                src="/assets/images/sayan-dey.jpeg"
                                alt="Roberta Casas"
                                width={40}
                                height={40}
                                className="rounded-full mr-3"
                            />
                            <span className="font-medium text-gray-900">Roberta Casas</span>
                        </div>
                        <Link href="#" className="text-fuchsia-600 font-medium flex items-center hover:underline">
                            Read more <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    )
}

