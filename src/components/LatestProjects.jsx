import Link from 'next/link';
import useSound from 'use-sound';

import { BorderBeam } from '@/components/MagicUi';
import { ArrowUpLeft, ChevronRight } from '@/components/SimpleIcons';

export default function LatestProjects({ projects }) {
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

    const featuredProjects = projects.filter(
        project => project.projectPostType?.isFeatured
    ).slice(-3);

    const beamConfigs = [
        {
            first: 'via-red-500',
            second: 'via-blue-500',
        },
        {
            first: 'via-amber-500',
            second: 'via-pink-500',
        },
        {
            first: 'via-fuchsia-500',
            second: 'via-cyan-500',
        }
    ];

    return (
        <div className="max-w-xl lg:max-w-none">
            <div className="mb-10 flex flex-nowrap items-end justify-between gap-x-8">
                <div className="grid w-10/12 grid-cols-1">
                    <h2 className="w-max cursor-pointer text-3xl font-semibold text-zinc-800 dark:text-zinc-100">
                        Latest Projects
                    </h2>
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
                        className="text-sm font-medium text-fuchsia-400 transition duration-500 group-hover:text-fuchsia-500"
                    >
                        Browse all
                    </Link>
                    <ChevronRight className="h-3 w-3 cursor-pointer text-fuchsia-400 transition duration-500 ease-in-out group-hover:translate-x-1 group-hover:text-fuchsia-500" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredProjects.map((project, index) => {
                    const config = beamConfigs[index] || beamConfigs[0];
                    return (
                        <div key={project.id} className="group relative h-full overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-2xs dark:border-zinc-700/40 dark:bg-zinc-800">
                            <Link
                                href={project.uri}
                                className="relative block p-6"
                                onMouseEnter={() => plungerPlaySfx()}
                                onMouseLeave={() => plungerStopSfx()}
                            >
                                <div className="flex items-start justify-end">
                                    <ArrowUpLeft className="h-4 w-4 scale-100 text-zinc-400/80 transition duration-500 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-fuchsia-500 dark:text-fuchsia-400 dark:hover:text-fuchsia-500" />
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-100 dark:group-hover:text-fuchsia-400">
                                    {project.title}
                                </h3>
                                <p className="mt-2 text-base line-clamp-3 text-zinc-600 dark:text-zinc-400">
                                    {project.excerpt.replace(/<[^>]+>/g, '')}
                                </p>
                                <div></div>
                            </Link>
                            <BorderBeam
                                duration={6}
                                size={250}
                                className={`from-transparent ${config.first} to-transparent`}
                            />
                            <BorderBeam
                                duration={6}
                                delay={3}
                                size={250}
                                className={`from-transparent ${config.second} to-transparent`}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
