import clsx from 'clsx';
import useSound from 'use-sound';
import { useSoundContext } from '@/context/sound';

export default function Ribbon({ children, className }) {
    const { soundEnabled } = useSoundContext();

    const [trashPlaySfx, { stop: trashStopSfx }] = useSound(
        '/assets/sounds/empty-trash.mp3',
        {
            volume: 0.75,
            sprite: { clipped: [0, 500] },
            soundEnabled
        }
    );

    return (
        <span
            onMouseEnter={() => trashPlaySfx({ id: 'clipped' })}
            onMouseLeave={() => trashStopSfx()}
            className={clsx(
                'inline-block -rotate-2 cursor-pointer rounded-md px-2 font-semibold transition delay-150 duration-300 hover:rotate-4 dark:text-zinc-800',
                className
            )}
        >
            {children}
        </span>
    );
}
