import Link from 'next/link';

import Container from '@/components/Container';
import SocialHandle from '@/components/SocialHandle';
import { HeartIcon } from '@/components/SimpleIcons';

function FooItem({ href, target, children }) {
    return (
        <Link
            href={href}
            target={target === '_blank' ? '_blank' : undefined}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className="transition hover:text-fuchsia-500 dark:hover:text-fuchsia-400"
        >
            {children}
        </Link>
    );
}

function FooterNavigation({ fooItems, ...props }) {
    return (
        <div {...props}>
            {fooItems &&
                fooItems.map((item) => (
                    <FooItem key={item.id} href={item.uri} target={item.target}>
                        {item.label}
                    </FooItem>
                ))}
        </div>
    );
}

export default function Footer({ menu, social }) {
    return (
        <footer className="mt-32">
            <Container.Outer>
                <div className="border-t border-zinc-100 py-12 dark:border-zinc-700/40">
                    <Container.Inner>
                        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                            <FooterNavigation
                                fooItems={menu}
                                className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200"
                            />

                            <SocialHandle
                                social={social}
                                className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
                            />
                        </div>
                        <div className="mt-8 flex flex-col items-center justify-center gap-1 md:mt-12">
                            <p className="text-sm text-zinc-400 dark:text-zinc-500">
                                &copy; {new Date().getFullYear()} Sayan Dey,
                                Powered by Next.js and Tailwind CSS
                            </p>
                            <p className="inline-flex items-center justify-center text-sm text-zinc-400 dark:text-zinc-500">
                                Made With <HeartIcon className="mx-1 h-4 w-4" />{' '}
                                In Kolkata
                            </p>
                        </div>
                    </Container.Inner>
                </div>
            </Container.Outer>
        </footer>
    );
}
