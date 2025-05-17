import clsx from 'clsx';
import useSound from 'use-sound';

export default function Ribbon({ children, className }) {
    const [trashPlaySfx, { stop: trashStopSfx }] = useSound(
        '/assets/sounds/empty-trash.mp3',
        {
            volume: 0.75,
            sprite: { clipped: [0, 500] }
        }
    );

    return (
        <span
            onMouseEnter={() => trashPlaySfx({ id: 'clipped' })}
            onMouseLeave={() => trashStopSfx()}
            className={clsx(
                'inline-block -rotate-3 cursor-pointer rounded-md px-3 leading-normal transition delay-150 duration-300 hover:rotate-4 dark:text-zinc-800',
                className
            )}
        >
            {children}
        </span>
    );
}
