import { Fragment, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import useSound from 'use-sound';
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    PopoverBackdrop,
    Transition,
    TransitionChild
} from '@headlessui/react';

import Container from '@/components/Container';
import { BorderBeam } from '@/components/MagicUi';
import {
    SunIcon,
    MoonIcon,
    CloseIcon,
    ChevronDown
} from '@/components/SimpleIcons';

function MobileNavItem({ href, children }) {
    return (
        <li>
            <PopoverButton as={Link} href={href} className="block py-2">
                {children}
            </PopoverButton>
        </li>
    );
}

function MobileNavigation({ navItems, ...props }) {
    return (
        <Popover {...props}>
            <PopoverButton className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
                Menu
                <ChevronDown className="ml-3 h-auto w-2 fill-none stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
            </PopoverButton>
            <Transition>
                <TransitionChild
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <PopoverBackdrop className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-xs dark:bg-black/80" />
                </TransitionChild>
                <TransitionChild
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <PopoverPanel
                        focus
                        className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
                    >
                        <div className="flex flex-row-reverse items-center justify-between">
                            <PopoverButton
                                aria-label="Close menu"
                                className="-m-1 p-1"
                            >
                                <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
                            </PopoverButton>
                            <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                Navigation
                            </h2>
                        </div>
                        <nav className="mt-6">
                            <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                                {navItems &&
                                    navItems.map((item) => (
                                        <MobileNavItem
                                            key={item.id}
                                            href={item.path}
                                        >
                                            {item.label}
                                        </MobileNavItem>
                                    ))}
                            </ul>
                        </nav>
                    </PopoverPanel>
                </TransitionChild>
            </Transition>
        </Popover>
    );
}

function NavItem({ href, target, children }) {
    const isActive = useRouter().pathname === href;

    return (
        <li>
            <Link
                href={href}
                target={target === '_blank' ? '_blank' : undefined}
                rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                className={clsx(
                    'relative block px-3 py-2 transition',
                    isActive
                        ? 'text-fuchsia-500 dark:text-fuchsia-400'
                        : 'hover:text-fuchsia-500 dark:hover:text-fuchsia-400'
                )}
            >
                {children}
                {isActive && (
                    <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-fuchsia-500/0 via-fuchsia-500/40 to-fuchsia-500/0 dark:from-fuchsia-400/0 dark:via-fuchsia-400/40 dark:to-fuchsia-400/0" />
                )}
            </Link>
        </li>
    );
}

function DesktopNavigation({ navItems, ...props }) {
    return (
        <nav {...props}>
            <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
                {navItems &&
                    navItems.map((item) => (
                        <NavItem
                            key={item.id}
                            href={item.uri}
                            target={item.target}
                        >
                            {item.label}
                        </NavItem>
                    ))}
            </ul>
        </nav>
    );
}

function ModeToggle() {
    const [switchOnSfx] = useSound('/assets/sounds/switch-on.mp3', {
        volume: 0.5
    });

    const [switchOffSfx] = useSound('assets/sounds/switch-off.mp3', {
        volume: 0.5
    });

    function disableTransitionsTemporarily() {
        document.documentElement.classList.add('**:transition-none!');
        window.setTimeout(() => {
            document.documentElement.classList.remove('**:transition-none!');
        }, 0);
    }

    function toggleMode() {
        disableTransitionsTemporarily();

        const darkModeMediaQuery = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );

        const isSystemDarkMode = darkModeMediaQuery.matches;
        const isDarkMode = document.documentElement.classList.toggle('dark');
        isDarkMode ? switchOnSfx() : switchOffSfx();

        if (isDarkMode === isSystemDarkMode) {
            delete window.localStorage.isDarkMode;
        } else {
            window.localStorage.isDarkMode = isDarkMode;
        }
    }

    return (
        <button
            type="button"
            aria-label="Toggle dark mode"
            className="group relative cursor-pointer overflow-hidden rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
            onClick={() => toggleMode()}
        >
            <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-fuchsia-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-fuchsia-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-fuchsia-600" />
            <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media_not_(prefers-color-scheme:dark)]:fill-fuchsia-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-fuchsia-400 [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400" />
            <BorderBeam
                size={40}
                initialOffset={20}
                className="from-transparent via-yellow-500 to-transparent dark:via-fuchsia-400"
                transition={{
                    type: 'spring',
                    stiffness: 60,
                    damping: 20
                }}
            />
        </button>
    );
}

function clamp(number, a, b) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return Math.min(Math.max(number, min), max);
}

function AvatarContainer({ className, ...props }) {
    return (
        <div
            className={clsx(
                className,
                'flex justify-between items-center h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10'
            )}
            {...props}
        />
    );
}

function Avatar({ large = false, className, ...props }) {
    return (
        <Link
            href="/"
            aria-label="Home"
            className={clsx(className, 'pointer-events-auto')}
            {...props}
        >
            <Image
                src="/assets/images/sayan-dey.jpeg"
                alt="Sayan"
                height={96}
                width={96}
                priority={true}
                className={clsx(
                    'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
                    large ? 'h-18 w-18' : 'h-10 w-10'
                )}
            />
        </Link>
    );
}

export default function Header({ menu }) {
    const isHomePage = useRouter().pathname === '/';

    const headerRef = useRef(null);
    const avatarRef = useRef(null);
    const isInitial = useRef(true);

    useEffect(() => {
        const downDelay = avatarRef.current?.offsetTop ?? 0;
        const upDelay = 64;

        function setProperty(property, value) {
            document.documentElement.style.setProperty(property, value);
        }

        function removeProperty(property) {
            document.documentElement.style.removeProperty(property);
        }

        function updateHeaderStyles() {
            if (!headerRef.current) {
                return;
            }

            const { top, height } = headerRef.current.getBoundingClientRect();
            const scrollY = clamp(
                window.scrollY,
                0,
                document.body.scrollHeight - window.innerHeight
            );

            if (isInitial.current) {
                setProperty('--header-position', 'sticky');
            }

            setProperty('--content-offset', `${downDelay}px`);

            if (isInitial.current || scrollY < downDelay) {
                setProperty('--header-height', `${downDelay + height}px`);
                setProperty('--header-mb', `${-downDelay}px`);
            } else if (top + height < -upDelay) {
                const offset = Math.max(height, scrollY - upDelay);
                setProperty('--header-height', `${offset}px`);
                setProperty('--header-mb', `${height - offset}px`);
            } else if (top === 0) {
                setProperty('--header-height', `${scrollY + height}px`);
                setProperty('--header-mb', `${-scrollY}px`);
            }

            if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
                setProperty('--header-inner-position', 'fixed');
                removeProperty('--header-top');
                removeProperty('--avatar-top');
            } else {
                removeProperty('--header-inner-position');
                setProperty('--header-top', '0px');
                setProperty('--avatar-top', '0px');
            }
        }

        function updateAvatarStyles() {
            if (!isHomePage) {
                return;
            }

            const fromScale = 1;
            const toScale = 36 / 64;
            const fromX = 0;
            const toX = 2 / 16;

            const scrollY = downDelay - window.scrollY;

            let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
            scale = clamp(scale, fromScale, toScale);

            let x = (scrollY * (fromX - toX)) / downDelay + toX;
            x = clamp(x, fromX, toX);

            setProperty(
                '--avatar-image-transform',
                `translate3d(${x}rem, 0, 0) scale(${scale})`
            );

            const borderScale = 1 / (toScale / scale);
            const borderX = (-toX + x) * borderScale;
            const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

            setProperty('--avatar-border-transform', borderTransform);
            setProperty('--avatar-border-opacity', scale === toScale ? 1 : 0);
        }

        function updateStyles() {
            updateHeaderStyles();
            updateAvatarStyles();
            isInitial.current = false;
        }

        updateStyles();
        window.addEventListener('scroll', updateStyles, { passive: true });
        window.addEventListener('resize', updateStyles);

        return () => {
            window.removeEventListener('scroll', updateStyles);
            window.removeEventListener('resize', updateStyles);
        };
    }, [isHomePage]);

    return (
        <>
            <header
                className="pointer-events-none relative z-50 flex flex-col"
                style={{
                    height: 'var(--header-height)',
                    marginBottom: 'var(--header-mb)'
                }}
            >
                {isHomePage && (
                    <>
                        <div
                            ref={avatarRef}
                            className="order-last mt-[calc(--spacing(16)-(--spacing(3)))]"
                        />
                        <Container
                            className="top-0 order-last -mb-3 pt-3"
                            style={{ position: 'var(--header-position)' }}
                        >
                            <div
                                className="top-(--avatar-top,--spacing(3)) w-full"
                                style={{
                                    position: 'var(--header-inner-position)'
                                }}
                            >
                                <div className="relative">
                                    <AvatarContainer
                                        className="absolute top-4 left-0.5 origin-left transition-opacity"
                                        style={{
                                            opacity:
                                                'var(--avatar-border-opacity, 0)',
                                            transform:
                                                'var(--avatar-border-transform)'
                                        }}
                                    />
                                    <Avatar
                                        large
                                        className="block h-18 w-18 origin-left"
                                        style={{
                                            transform:
                                                'var(--avatar-image-transform)'
                                        }}
                                    />
                                </div>
                            </div>
                        </Container>
                    </>
                )}
                <div
                    ref={headerRef}
                    className="top-0 z-10 h-16 pt-6"
                    style={{ position: 'var(--header-position)' }}
                >
                    <Container
                        className="top-(--header-top,--spacing(6)) w-full"
                        style={{ position: 'var(--header-inner-position)' }}
                    >
                        <div className="relative flex gap-4">
                            <div className="flex flex-1">
                                {!isHomePage && (
                                    <AvatarContainer>
                                        <Avatar className="block h-10 w-10" />
                                    </AvatarContainer>
                                )}
                            </div>
                            <div className="flex flex-1 justify-end md:justify-center">
                                <MobileNavigation
                                    navItems={menu}
                                    className="pointer-events-auto md:hidden"
                                />
                                <DesktopNavigation
                                    navItems={menu}
                                    className="pointer-events-auto hidden md:block"
                                />
                            </div>
                            <div className="flex justify-end md:flex-1">
                                <div className="pointer-events-auto flex flex-nowrap items-center justify-between gap-x-3">
                                    <ModeToggle />
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </header>
            {isHomePage && <div style={{ height: 'var(--content-offset)' }} />}
        </>
    );
}
