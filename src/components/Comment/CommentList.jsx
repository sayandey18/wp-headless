import { useState } from 'react';

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function Comment({ comment, replies = [], onReply }) {
    const [showReplies, setShowReplies] = useState(false);
    const hasReplies = replies.length > 0;

    // Remove status check temporarily to see all comments
    return (
        <div className="mb-6">
            <div className="flex items-start space-x-4">
                <img
                    src={comment.author?.node?.avatar?.url}
                    alt={comment.author?.node?.name}
                    className="h-10 w-10 rounded-full"
                />
                <div className="flex-1">
                    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700/40 dark:bg-zinc-800">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                {comment.author?.node?.name}
                            </h4>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                {formatDate(comment.date)}
                            </span>
                        </div>
                        <div
                            className="prose prose-sm dark:prose-invert mt-2 max-w-none text-sm text-zinc-600 dark:text-zinc-300"
                            dangerouslySetInnerHTML={{
                                __html: comment.content
                            }}
                        />
                    </div>
                    <div className="mt-2 flex items-center space-x-4">
                        <button
                            onClick={() => onReply(comment)}
                            className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                        >
                            Reply
                        </button>
                        {hasReplies && (
                            <button
                                onClick={() => setShowReplies(!showReplies)}
                                className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                            >
                                {showReplies
                                    ? 'Hide Replies'
                                    : `Show Replies (${replies.length})`}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {showReplies && hasReplies && (
                <div className="mt-4 ml-14 space-y-4">
                    {replies.map((reply) => (
                        <div
                            key={reply.id}
                            className="flex items-start space-x-4"
                        >
                            <img
                                src={
                                    reply.author?.node?.avatar?.url ||
                                    '/default-avatar.png'
                                }
                                alt={reply.author?.node?.name}
                                className="h-8 w-8 rounded-full"
                            />
                            <div className="flex-1">
                                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700/40 dark:bg-zinc-800">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                            {reply.author?.node?.name}
                                        </h4>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                            {formatDate(reply.date)}
                                        </span>
                                    </div>
                                    <div
                                        className="prose prose-sm dark:prose-invert mt-2 max-w-none text-sm text-zinc-600 dark:text-zinc-300"
                                        dangerouslySetInnerHTML={{
                                            __html: reply.content
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function CommentList({ comments = [], onReply }) {
    // Remove status filtering temporarily
    const approvedComments = comments;
    const parentComments = approvedComments.filter(
        (comment) => !comment.parentId
    );

    // Create a map of parent comments to their replies
    const repliesMap = approvedComments.reduce((acc, comment) => {
        if (comment.parentId) {
            if (!acc[comment.parentId]) {
                acc[comment.parentId] = [];
            }
            acc[comment.parentId].push(comment);
        }
        return acc;
    }, {});

    if (parentComments.length === 0) {
        return (
            <div className="text-center text-zinc-500 dark:text-zinc-400">
                No comments yet. Be the first to comment!
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h3 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Comments ({parentComments.length})
            </h3>
            <div className="space-y-6">
                {parentComments.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        replies={repliesMap[comment.id] || []}
                        onReply={onReply}
                    />
                ))}
            </div>
        </div>
    );
}
