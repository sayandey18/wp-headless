import Link from 'next/link';
import clsx from 'clsx';
import { GitHub, LinkedIn, Twitter } from '@/components/SimpleIcons';

function SocialLink({ icon: Icon, ...props }) {
    return (
        <a className="group -m-1 p-1" {...props}>
            <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
        </a>
    );
}

export default function SocialHandle({ social, className }) {
    return (
        <div className={clsx(className, 'flex gap-6')}>
            {social?.twitter && (
                <SocialLink
                    href={social.twitter}
                    target="_blank"
                    rel="noopener"
                    aria-label="Follow on Twitter"
                    icon={Twitter}
                />
            )}
            {social?.github && (
                <SocialLink
                    href={social.github}
                    target="_blank"
                    rel="noopener"
                    aria-label="Follow on GitHub"
                    icon={GitHub}
                />
            )}
            {social?.linkedin && (
                <SocialLink
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener"
                    aria-label="Follow on LinkedIn"
                    icon={LinkedIn}
                />
            )}
        </div>
    );
}
