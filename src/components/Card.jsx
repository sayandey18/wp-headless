import Link from 'next/link';
import clsx from 'clsx';
import useSound from 'use-sound';
import { useSoundContext } from '@/context/sound';

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

export default function Card({ as: Component = 'div', className, children }) {
    return (
        <Component
            className={clsx(
                className,
                'group relative flex flex-col items-start'
            )}
        >
            {children}
        </Component>
    );
}

Card.Link = function CardLink({ children, ...props }) {
    return (
        <Link {...props}>
            <span className="relative">{children}</span>
        </Link>
    );
};

Card.Title = function CardTitle({ as: Component = 'h2', href, children }) {
    return (
        <Component className="text-xl font-semibold tracking-tight text-zinc-800 decoration-blue-600 hover:underline hover:underline-offset-3 dark:text-zinc-100">
            {href ? <Card.Link href={href}>{children}</Card.Link> : children}
        </Component>
    );
};

Card.Description = function CardDescription({ children }) {
    return (
        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
            {children}
        </p>
    );
};

Card.Cta = function CardCta({ children, slug }) {
    const { soundEnabled } = useSoundContext();

    const [risingPlaySfx, { stop: risingStopSfx }] = useSound(
        '/assets/sounds/rising-pops.mp3',
        {
            volume: 0.5,
            soundEnabled
        }
    );

    return (
        <div
            onMouseEnter={() => risingPlaySfx()}
            onMouseLeave={() => risingStopSfx()}
            className="group mt-4 flex items-center justify-end gap-1"
        >
            <Link href={slug} className="text-base font-medium text-teal-500">
                {children}
            </Link>
            <ChevronRight className="h-3 w-3 cursor-pointer text-teal-500 transition duration-500 ease-in-out group-hover:translate-x-1 group-hover:text-teal-400" />
        </div>
    );
};

Card.Eyebrow = function CardEyebrow({
    as: Component = 'p',
    decorate = false,
    className,
    children,
    ...props
}) {
    return (
        <Component
            className={clsx(
                className,
                'relative order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500',
                decorate && 'pl-3.5'
            )}
            {...props}
        >
            {decorate && (
                <span
                    className="absolute inset-y-0 left-0 flex items-center"
                    aria-hidden="true"
                >
                    <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                </span>
            )}
            {children}
        </Component>
    );
};
