import clsx from 'clsx';

export default function Prose({ children, className }) {
    return (
        <div
            className={clsx(className, 'prose dark:prose-invert')}
            dangerouslySetInnerHTML={{ __html: children }}
        ></div>
    );
}
