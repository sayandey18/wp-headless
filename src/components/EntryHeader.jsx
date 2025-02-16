import Image from 'next/image';
import { useMemo } from 'react';
import readingDuration from 'reading-duration';

export default function EntryHeader({ header }) {
    const { date, content, author } = header;

    return (
        <div className="mt-8 flex w-full flex-col items-start justify-between md:flex-row md:items-center">
            <div className="flex items-center">
                <Image
                    src={author?.avatar?.url}
                    alt={author?.name}
                    height={25}
                    width={25}
                    sizes="20vw"
                    className="rounded-full"
                />
                <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {author?.name}
                    {' / '}
                    {useMemo(
                        () => (date ? new Date(date).toDateString() : ''),
                        [date]
                    )}
                </p>
            </div>
            <p className="mt-2 min-w-32 text-sm text-gray-600 md:mt-0 dark:text-gray-400">
                {'Time: '}
                {readingDuration(content) || 'N/A'}
            </p>
        </div>
    );
}
