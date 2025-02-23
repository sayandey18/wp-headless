import Image from 'next/image';
import Link from 'next/link';
import useSound from 'use-sound';

import { BorderBeam, TextAnimate } from '@/components/MagicUi';

function ArrowUpLeftIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
            <path
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
            />
        </svg>
    );
}

function ChevronRight(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
            <path
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
        </svg>
    );
}

export default function LatestProjects() {
    const [plungerPlaySfx, { stop: plungerStopSfx }] = useSound(
        '/assets/sounds/plunger-immediate.mp3',
        {
            volume: 0.5,
            interrupt: true
        }
    );

    const [risingPlaySfx, { stop: risingStopSfx }] = useSound(
        '/assets/sounds/rising-pops.mp3',
        { volume: 0.5 }
    );

    return (
        <div className="max-w-xl lg:max-w-none">
            <div className="mb-10 flex flex-nowrap items-end justify-between gap-x-8">
                <div className="grid w-10/12 grid-cols-1">
                    <TextAnimate
                        as="h2"
                        by="character"
                        animation="slideLeft"
                        className="w-max cursor-pointer text-3xl font-semibold text-zinc-800 transition duration-500 ease-in-out hover:underline hover:underline-offset-2 dark:text-zinc-100"
                    >
                        Latest Projects
                    </TextAnimate>
                    <p className="mt-2 w-max text-base text-zinc-600 dark:text-zinc-400">
                        Discover what we've been working on recently.
                    </p>
                </div>
                <div
                    onMouseEnter={() => risingPlaySfx()}
                    onMouseLeave={() => risingStopSfx()}
                    className="group mr-1 hidden w-2/12 md:flex md:items-center md:justify-end md:gap-px"
                >
                    <Link
                        href="/projects"
                        className="text-xs font-medium text-teal-500 transition duration-500 group-hover:text-teal-400"
                    >
                        Browse all
                    </Link>
                    <ChevronRight className="h-3 w-3 cursor-pointer text-teal-500 transition duration-500 ease-in-out group-hover:translate-x-1 group-hover:text-teal-400" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="group relative h-full overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-2xs dark:border-zinc-700/40 dark:bg-zinc-800">
                    <Link
                        href=""
                        className="relative block p-6"
                        onMouseEnter={() => plungerPlaySfx()}
                        onMouseLeave={() => plungerStopSfx()}
                    >
                        <div className="flex items-start justify-between">
                            <Image
                                src="https://cdn.prod.website-files.com/65368bb1ddd075f23c278b7b/6536d8d319b004cb8c71c9a4_devdocs-x-icon-personalfolio-x-webflow-template.png"
                                alt="icon"
                                width={40}
                                height={40}
                            />
                            <ArrowUpLeftIcon className="h-4 w-4 scale-100 text-zinc-400/80 transition duration-500 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-500" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100 dark:group-hover:text-teal-500">
                            DevDocs X
                        </h3>
                        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                            Lorem ipsum dolor sit amet consectetur tincidunt
                            lorem quam ultrices sapien.
                        </p>
                        <div></div>
                    </Link>
                    <BorderBeam
                        duration={6}
                        size={250}
                        className="from-transparent via-red-500 to-transparent"
                    />
                    <BorderBeam
                        duration={6}
                        delay={3}
                        size={250}
                        className="from-transparent via-blue-500 to-transparent"
                    />
                </div>

                <div className="group relative h-full overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-2xs dark:border-zinc-700/40 dark:bg-zinc-800">
                    <Link
                        href=""
                        className="relative block p-6"
                        onMouseEnter={() => plungerPlaySfx()}
                        onMouseLeave={() => plungerStopSfx()}
                    >
                        <div className="flex items-start justify-between">
                            <Image
                                src="https://cdn.prod.website-files.com/65368bb1ddd075f23c278b7b/653a8b0cb3e5f9b3e71c88b7_emailstudio-x-icon-personalfolio-x-webflow-template.png"
                                alt="icon"
                                width={40}
                                height={40}
                            />
                            <ArrowUpLeftIcon className="h-4 w-4 scale-100 text-zinc-400/80 transition duration-500 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-500" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100 dark:group-hover:text-teal-500">
                            Startuply X
                        </h3>
                        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                            Lorem ipsum dolor sit amet consectetur tincidunt
                            lorem quam ultrices sapien.
                        </p>
                    </Link>
                    <BorderBeam
                        duration={6}
                        size={250}
                        className="from-transparent via-amber-500 to-transparent"
                    />
                    <BorderBeam
                        duration={6}
                        delay={3}
                        size={250}
                        className="from-transparent via-pink-500 to-transparent"
                    />
                </div>

                <div className="group relative h-full overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-2xs dark:border-zinc-700/40 dark:bg-zinc-800">
                    <Link
                        href=""
                        className="relative block p-6"
                        onMouseEnter={() => plungerPlaySfx()}
                        onMouseLeave={() => plungerStopSfx()}
                    >
                        <div className="flex items-start justify-between">
                            <Image
                                src="https://cdn.prod.website-files.com/65368bb1ddd075f23c278b7b/6536d868a7e7884f9c66bd42_startuply-x-icon-personalfolio-x-webflow-template.png"
                                alt="icon"
                                width={40}
                                height={40}
                            />
                            <ArrowUpLeftIcon className="h-4 w-4 scale-100 text-zinc-400/80 transition duration-500 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-500" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100 dark:group-hover:text-teal-500">
                            EmailStudio X
                        </h3>
                        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                            Lorem ipsum dolor sit amet consectetur tincidunt
                            lorem quam ultrices sapien. It amet consectetur
                            tincidunt.
                        </p>
                    </Link>
                    <BorderBeam
                        duration={8}
                        size={250}
                        className="from-transparent via-fuchsia-500 to-transparent"
                    />
                    <BorderBeam
                        duration={8}
                        delay={3}
                        size={250}
                        className="from-transparent via-cyan-500 to-transparent"
                    />
                </div>
            </div>
        </div>
    );
}
