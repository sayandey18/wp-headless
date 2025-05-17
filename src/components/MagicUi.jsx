import React, { useRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AnimatePresence, useInView, motion } from 'motion/react';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function BorderBeam({
    className,
    size = 50,
    delay = 0,
    duration = 6,
    colorFrom = '#ffaa40',
    colorTo = '#9c40ff',
    transition,
    style,
    reverse = false,
    initialOffset = 0
}) {
    return (
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] [mask-composite:intersect] [mask-clip:padding-box,border-box]">
            <motion.div
                className={cn(
                    'absolute aspect-square',
                    'bg-linear-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent',
                    className
                )}
                style={{
                    width: size,
                    offsetPath: `rect(0 auto auto 0 round ${size}px)`,
                    '--color-from': colorFrom,
                    '--color-to': colorTo,
                    ...style
                }}
                initial={{ offsetDistance: `${initialOffset}%` }}
                animate={{
                    offsetDistance: reverse
                        ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
                        : [`${initialOffset}%`, `${100 + initialOffset}%`]
                }}
                transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration,
                    delay: -delay,
                    ...transition
                }}
            />
        </div>
    );
}

export function TextAnimate({
    children,
    delay = 0,
    duration = 0.3,
    variants,
    className,
    segmentClassName,
    as: Component = 'p',
    startOnView = true,
    once = false,
    by = 'word',
    animation = 'fadeIn',
    ...props
}) {
    const MotionComponent = motion.create(Component);

    const staggerTimings = {
        text: 0.06,
        word: 0.05,
        character: 0.03,
        line: 0.06
    };

    const defaultContainerVariants = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const defaultItemVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1
        },
        exit: {
            opacity: 0
        }
    };

    const defaultItemAnimationVariants = {
        fadeIn: {
            container: defaultContainerVariants,
            item: {
                hidden: { opacity: 0, y: 20 },
                show: (delay) => ({
                    opacity: 1,
                    y: 0,
                    transition: {
                        delay,
                        duration: 0.3
                    }
                }),
                exit: {
                    opacity: 0,
                    y: 20,
                    transition: { duration: 0.3 }
                }
            }
        },
        blurIn: {
            container: defaultContainerVariants,
            item: {
                hidden: { opacity: 0, filter: 'blur(10px)' },
                show: (i) => ({
                    opacity: 1,
                    filter: 'blur(0px)',
                    transition: {
                        delay: i * 0.1,
                        duration: 0.3
                    }
                }),
                exit: {
                    opacity: 0,
                    filter: 'blur(10px)',
                    transition: { duration: 0.3 }
                }
            }
        },
        blurInUp: {
            container: defaultContainerVariants,
            item: {
                hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
                show: (delay) => ({
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    transition: {
                        y: { duration: 0.3 },
                        opacity: { duration: 0.4 },
                        filter: { duration: 0.3 }
                    }
                }),
                exit: {
                    opacity: 0,
                    filter: 'blur(10px)',
                    y: 20,
                    transition: {
                        y: { duration: 0.3 },
                        opacity: { duration: 0.4 },
                        filter: { duration: 0.3 }
                    }
                }
            }
        },
        blurInDown: {
            container: defaultContainerVariants,
            item: {
                hidden: { opacity: 0, filter: 'blur(10px)', y: -20 },
                show: (delay) => ({
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    transition: {
                        y: { duration: 0.3 },
                        opacity: { duration: 0.4 },
                        filter: { duration: 0.3 }
                    }
                })
            }
        },
        slideUp: {
            container: defaultContainerVariants,
            item: {
                hidden: { y: 20, opacity: 0 },
                show: (delay) => ({
                    y: 0,
                    opacity: 1,
                    transition: {
                        delay,
                        duration: 0.3
                    }
                }),
                exit: {
                    y: -20,
                    opacity: 0,
                    transition: {
                        duration: 0.3
                    }
                }
            }
        },
        slideDown: {
            container: defaultContainerVariants,
            item: {
                hidden: { y: -20, opacity: 0 },
                show: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.3 }
                },
                exit: {
                    y: 20,
                    opacity: 0,
                    transition: { duration: 0.3 }
                }
            }
        },
        slideLeft: {
            container: defaultContainerVariants,
            item: {
                hidden: { x: 20, opacity: 0 },
                show: {
                    x: 0,
                    opacity: 1,
                    transition: { duration: 0.3 }
                },
                exit: {
                    x: -20,
                    opacity: 0,
                    transition: { duration: 0.3 }
                }
            }
        },
        slideRight: {
            container: defaultContainerVariants,
            item: {
                hidden: { x: -20, opacity: 0 },
                show: {
                    x: 0,
                    opacity: 1,
                    transition: { duration: 0.3 }
                },
                exit: {
                    x: 20,
                    opacity: 0,
                    transition: { duration: 0.3 }
                }
            }
        },
        scaleUp: {
            container: defaultContainerVariants,
            item: {
                hidden: { scale: 0.5, opacity: 0 },
                show: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                        duration: 0.3,
                        scale: {
                            type: 'spring',
                            damping: 15,
                            stiffness: 300
                        }
                    }
                },
                exit: {
                    scale: 0.5,
                    opacity: 0,
                    transition: { duration: 0.3 }
                }
            }
        },
        scaleDown: {
            container: defaultContainerVariants,
            item: {
                hidden: { scale: 1.5, opacity: 0 },
                show: (delay) => ({
                    scale: 1,
                    opacity: 1,
                    transition: {
                        delay,
                        duration: 0.3,
                        scale: {
                            type: 'spring',
                            damping: 15,
                            stiffness: 300
                        }
                    }
                }),
                exit: {
                    scale: 1.5,
                    opacity: 0,
                    transition: { duration: 0.3 }
                }
            }
        }
    };

    // Use provided variants or default variants based on animation type
    const finalVariants = animation
        ? {
              container: {
                  ...defaultItemAnimationVariants[animation].container,
                  show: {
                      ...defaultItemAnimationVariants[animation].container.show,
                      transition: {
                          staggerChildren: staggerTimings[by]
                      }
                  },
                  exit: {
                      ...defaultItemAnimationVariants[animation].container.exit,
                      transition: {
                          staggerChildren: staggerTimings[by],
                          staggerDirection: -1
                      }
                  }
              },
              item: defaultItemAnimationVariants[animation].item
          }
        : { container: defaultContainerVariants, item: defaultItemVariants };

    let segments = [];
    switch (by) {
        case 'word':
            segments = children.split(/(\s+)/);
            break;
        case 'character':
            segments = children.split('');
            break;
        case 'line':
            segments = children.split('\n');
            break;
        case 'text':
        default:
            segments = [children];
            break;
    }

    return (
        <AnimatePresence mode="popLayout">
            <MotionComponent
                variants={finalVariants.container}
                initial="hidden"
                whileInView={startOnView ? 'show' : undefined}
                animate={startOnView ? undefined : 'show'}
                exit="exit"
                className={cn('whitespace-pre-wrap', className)}
                viewport={{ once }}
                {...props}
            >
                {segments.map((segment, i) => (
                    <motion.span
                        key={`${by}-${segment}-${i}`}
                        variants={finalVariants.item}
                        custom={i * staggerTimings[by]}
                        className={cn(
                            by === 'line'
                                ? 'block'
                                : 'inline-block whitespace-pre',
                            segmentClassName
                        )}
                    >
                        {segment}
                    </motion.span>
                ))}
            </MotionComponent>
        </AnimatePresence>
    );
}

export function Marquee({
    className,
    reverse = false,
    pauseOnHover = false,
    children,
    vertical = false,
    repeat = 4,
    ...props
}) {
    return (
        <div
            {...props}
            className={cn(
                'group flex [gap:var(--gap)] overflow-hidden p-2 [--duration:40s] [--gap:1rem]',
                {
                    'flex-row': !vertical,
                    'flex-col': vertical
                },
                className
            )}
        >
            {Array(repeat)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            'flex shrink-0 justify-around [gap:var(--gap)]',
                            {
                                'animate-marquee flex-row': !vertical,
                                'animate-marquee-vertical flex-col': vertical,
                                'group-hover:[animation-play-state:paused]':
                                    pauseOnHover,
                                '[animation-direction:reverse]': reverse
                            }
                        )}
                    >
                        {children}
                    </div>
                ))}
        </div>
    );
}

export function BlurFade({
    children,
    className,
    variant,
    duration = 0.4,
    delay = 0,
    offset = 6,
    direction = 'down',
    inView = false,
    inViewMargin = '-50px',
    blur = '6px',
    ...props
}) {
    const ref = useRef(null);
    const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
    const isInView = !inView || inViewResult;
    const defaultVariants = {
        hidden: {
            [direction === 'left' || direction === 'right' ? 'x' : 'y']:
                direction === 'right' || direction === 'down'
                    ? -offset
                    : offset,
            opacity: 0
        },
        visible: {
            [direction === 'left' || direction === 'right' ? 'x' : 'y']: 0,
            opacity: 1
        }
    };
    const combinedVariants = variant || defaultVariants;
    return (
        <AnimatePresence>
            <motion.div
                ref={ref}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                exit="hidden"
                variants={combinedVariants}
                transition={{
                    delay: 0.04 + delay,
                    duration,
                    ease: 'easeOut'
                }}
                className={className}
                {...props}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
