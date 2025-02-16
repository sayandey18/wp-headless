import clsx from 'clsx';
import useSound from 'use-sound';
import { useSoundContext } from '@/context/sound';

export default function Ribbon({ children, className }) {
    const { soundEnabled } = useSoundContext();

    const [trashPlaySfx, { stop: trashStopSfx }] = useSound('/assets/sounds/empty-trash.mp3', {
        volume: 0.75,
        sprite: { clipped: [0, 500] },
        soundEnabled
    });

    return (
        <span
            onMouseEnter={() => trashPlaySfx({ id: "clipped" })}
            onMouseLeave={() => trashStopSfx()}
            className={clsx(
                "rounded-md cursor-pointer font-semibold -rotate-2 px-2 transition duration-300 delay-150 inline-block dark:text-zinc-800 hover:rotate-4",
                className
            )}
        >
            {children}
        </span>
    );
}