import Image from 'next/image';
import clsx from 'clsx';

export default function Photos() {
    const rotations = [
        'rotate-2',
        '-rotate-2',
        'rotate-2',
        'rotate-2',
        '-rotate-2'
    ];
    const image1 =
        'https://images.unsplash.com/photo-1511140276483-30c1217ca449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';
    const image2 =
        'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80';
    const image3 =
        'https://images.unsplash.com/photo-1547043736-b2247cb34b01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80';
    const image4 =
        'https://images.unsplash.com/photo-1514733072381-980fd06a6128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';
    const image5 =
        'https://images.unsplash.com/photo-1541873676-a18131494184?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1318&q=80';

    return (
        <div className="mt-16 sm:mt-20">
            <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                {[image1, image2, image3, image4, image5].map(
                    (image, imageIndex) => (
                        <div
                            key={imageIndex}
                            className={clsx(
                                'relative aspect-9/10 w-44 flex-none cursor-pointer overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
                                rotations[imageIndex % rotations.length]
                            )}
                        >
                            <Image
                                src={image}
                                alt=""
                                height={320}
                                width={288}
                                sizes="(min-width: 640px) 18rem, 11rem"
                                className="absolute inset-0 h-full w-full object-cover transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
