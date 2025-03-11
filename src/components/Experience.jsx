import Image from 'next/image';

import Button from '@/components/Button';
import { BorderBeam } from '@/components/MagicUi';
import { ArrowDown, Briefcase } from '@/components/SimpleIcons';

export default function Experience() {
    const resume = [
        {
            company: 'Matrix Media',
            title: 'Sr. Web Developer',
            logo: '/assets/images/logo/matrix.png',
            start: 'May 2023',
            end: {
                label: 'Present',
                dateTime: new Date().getFullYear()
            }
        },
        {
            company: 'Liberating Solution',
            title: 'Web Developer',
            logo: '/assets/images/logo/liberating.png',
            start: 'Jul 2021',
            end: 'Apr 2023'
        }
    ];

    return (
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700/40 dark:bg-zinc-800">
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <Briefcase className="h-6 w-6 flex-none fill-none" />
                <span className="ml-3">Work Experience</span>
            </h2>
            <ol className="mt-6 space-y-4">
                {resume.map((role, roleIndex) => (
                    <li key={roleIndex} className="flex gap-4">
                        <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                            <Image
                                src={role.logo}
                                alt={role.company}
                                width={50}
                                height={50}
                                className="h-7 w-7"
                            />
                        </div>
                        <dl className="flex flex-auto flex-wrap gap-x-2">
                            <dt className="sr-only">Company</dt>
                            <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {role.company}
                            </dd>
                            <dt className="sr-only">Role</dt>
                            <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                                {role.title}
                            </dd>
                            <dt className="sr-only">Date</dt>
                            <dd
                                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                                aria-label={`${role.start.label ?? role.start} until ${
                                    role.end.label ?? role.end
                                }`}
                            >
                                <time
                                    dateTime={role.start.dateTime ?? role.start}
                                >
                                    {role.start.label ?? role.start}
                                </time>{' '}
                                <span aria-hidden="true">—</span>{' '}
                                <time dateTime={role.end.dateTime ?? role.end}>
                                    {role.end.label ?? role.end}
                                </time>
                            </dd>
                        </dl>
                    </li>
                ))}
            </ol>
            <Button href="#" variant="secondary" className="group mt-6 w-full">
                Download CV
                <ArrowDown className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
            </Button>
            <BorderBeam duration={8} size={200} />
        </div>
    );
}
