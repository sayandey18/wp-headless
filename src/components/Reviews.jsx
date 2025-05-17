import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Marquee } from '@/components/MagicUi';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

function ReviewCard({ img, name, username, body }) {
    return (
        <figure
            className={cn(
                'relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4',
                // light styles
                'border-zinc-200 bg-zinc-100/50 hover:bg-gray-500/5',
                // dark styles
                'dark:border-zinc-200/10 dark:bg-zinc-100/15 dark:hover:bg-gray-500/40'
            )}
        >
            <div className="bg-w flex flex-row items-center gap-2">
                <img
                    className="rounded-full"
                    width="32"
                    height="32"
                    alt=""
                    src={img}
                />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium text-zinc-900 dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium text-zinc-600 dark:text-zinc-500">
                        {username}
                    </p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                {body}
            </blockquote>
        </figure>
    );
}

export default function Reviews() {
    const reviews = [
        {
            name: 'Jack',
            username: '@jack',
            body: "I've never seen anything like this before. It's amazing. I love it.",
            img: 'https://avatar.vercel.sh/jack'
        },
        {
            name: 'Jill',
            username: '@jill',
            body: "I don't know what to say. I'm speechless. This is amazing.",
            img: 'https://avatar.vercel.sh/jill'
        },
        {
            name: 'John',
            username: '@john',
            body: "I'm at a loss for words. This is amazing. I love it.",
            img: 'https://avatar.vercel.sh/john'
        },
        {
            name: 'Jane',
            username: '@jane',
            body: "I'm at a loss for words. This is amazing. I love it.",
            img: 'https://avatar.vercel.sh/jane'
        },
        {
            name: 'Jenny',
            username: '@jenny',
            body: "I'm at a loss for words. This is amazing. I love it.",
            img: 'https://avatar.vercel.sh/jenny'
        },
        {
            name: 'James',
            username: '@james',
            body: "I'm at a loss for words. This is amazing. I love it.",
            img: 'https://avatar.vercel.sh/james'
        }
    ];

    const firstRow = reviews.slice(0, reviews.length / 2);
    const secondRow = reviews.slice(reviews.length / 2);

    return (
        <div className="relative mt-12 flex w-full flex-col items-center justify-center overflow-hidden lg:mt-18">
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
        </div>
    );
}
