import Image from 'next/image';
import Link from 'next/link';
import useSound from 'use-sound';
import { useSoundContext } from '@/context/sound';

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
    const { soundEnabled } = useSoundContext();
    
    const [plungerPlaySfx, { stop: plungerStopSfx }] = useSound(
        '/assets/sounds/plunger-immediate.mp3',
        {
            volume: 0.5,
            soundEnabled,
            interrupt: true
        }
    );

    const [risingPlaySfx, { stop: risingStopSfx }] = useSound(
        '/assets/sounds/rising-pops.mp3', { 
            volume: 0.5,
            soundEnabled
        }
    );

    return (
        <div className="my-12 w-full">
            <div className="mb-10 flex flex-nowrap items-end justify-between gap-x-8">
                <div className="grid w-10/12 grid-cols-1">
                    <h2 className="text-3xl w-max cursor-pointer font-semibold text-teal-500 transition duration-500 ease-in-out hover:underline hover:underline-offset-2">
                        Latest Projects
                    </h2>
                    <p className="mt-2 w-max text-base text-zinc-600 dark:text-zinc-400">
                        Discover what we've been working on recently.
                    </p>
                </div>
                <div
                    onMouseEnter={() => risingPlaySfx()}
                    onMouseLeave={() => risingStopSfx()}
                    className="group mr-1 flex w-2/12 items-center justify-end gap-px"
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
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50/20 shadow-2xs dark:border-zinc-700/40 dark:bg-zinc-800/50">
                    <Link
                        href=""
                        className="group relative block p-6"
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
                            <ArrowUpLeftIcon className="h-4 w-4 scale-100 text-zinc-400/80 transition duration-500 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-500" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900 transition duration-500 group-hover:text-teal-500 dark:text-zinc-100 dark:group-hover:text-teal-500">
                            DevDocs X
                        </h3>
                        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                            Lorem ipsum dolor sit amet consectetur tincidunt
                            lorem quam ultrices sapien.
                        </p>
                        <div></div>
                    </Link>
                </div>

                <div className="rounded-2xl border border-zinc-100 bg-zinc-50/20 shadow-2xs dark:border-zinc-700/40 dark:bg-zinc-800/50">
                    <Link
                        href=""
                        className="group relative block p-6"
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
                            <ArrowUpLeftIcon className="h-4 w-4 scale-100 text-zinc-400/80 transition duration-500 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-500" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900 transition duration-500 group-hover:text-teal-500 dark:text-zinc-100 dark:group-hover:text-teal-500">
                            Startuply X
                        </h3>
                        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                            Lorem ipsum dolor sit amet consectetur tincidunt
                            lorem quam ultrices sapien.
                        </p>
                    </Link>
                </div>

                <div className="rounded-2xl border border-zinc-100 bg-zinc-50/20 shadow-2xs dark:border-zinc-700/40 dark:bg-zinc-800/50">
                    <Link
                        href=""
                        className="group relative block p-6"
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
                            <ArrowUpLeftIcon className="h-4 w-4 scale-100 text-zinc-400/80 transition duration-500 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-500" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900 transition duration-500 group-hover:text-teal-500 dark:text-zinc-100 dark:group-hover:text-teal-500">
                            EmailStudio X
                        </h3>
                        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                            Lorem ipsum dolor sit amet consectetur tincidunt
                            lorem quam ultrices sapien.
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
