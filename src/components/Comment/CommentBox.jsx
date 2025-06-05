import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LeaveCommentMutation } from '@/graphql/mutations';
import clsx from 'clsx';

export default function CommentBox({ id, parentId = 0, onSuccess }) {
    const [formValues, setFormValues] = useState({
        author: '',
        email: '',
        content: ''
    });

    const [formStatus, setFormStatus] = useState({
        error: null,
        success: false,
        loading: false
    });

    const [createComment] = useMutation(LeaveCommentMutation);

    const handleInputChange = (e) => {
        setFormValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        // Clear error when user starts typing
        if (formStatus.error) {
            setFormStatus((prev) => ({ ...prev, error: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ loading: true, error: null, success: false });

        try {
            const { data } = await createComment({
                variables: {
                    input: {
                        commentOn: id,
                        content: formValues.content,
                        author: formValues.author,
                        authorEmail: formValues.email,
                        parent: parentId
                    }
                }
            });

            if (data.createComment.success) {
                setFormStatus({ loading: false, error: null, success: true });
                setFormValues({ author: '', email: '', content: '' });
                if (onSuccess) {
                    onSuccess();
                }
            } else {
                throw new Error('Comment submission failed');
            }
        } catch (error) {
            setFormStatus({
                loading: false,
                error: error.message || 'An error occurred.',
                success: false
            });
        }
    };

    return (
        <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-700/50 dark:bg-zinc-800/95 dark:shadow-zinc-900/20">
            <div className="border-b border-zinc-100 bg-zinc-50 px-6 py-4 dark:border-zinc-700/50 dark:bg-zinc-800/80">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {parentId ? 'Leave a Reply' : 'Leave a Comment'}
                </h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 p-6 pt-5">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="author"
                            className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formValues.author}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400"
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400"
                            placeholder="your@email.com"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="content"
                        className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                        Comment
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={formValues.content}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-zinc-400"
                        placeholder="Write your comment here..."
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={formStatus.loading}
                        className={clsx(
                            'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none',
                            formStatus.loading
                                ? 'cursor-not-allowed bg-zinc-300 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400'
                                : 'bg-zinc-900 text-white shadow-sm hover:bg-zinc-800 focus:ring-zinc-400/50 active:scale-[0.98] dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:focus:ring-zinc-500/50'
                        )}
                    >
                        {formStatus.loading ? 'Submitting...' : 'Post Comment'}
                    </button>
                </div>

                {formStatus.error && (
                    <div className="mt-4 overflow-hidden rounded-lg border border-red-200 bg-red-50/80 p-4 backdrop-blur-sm dark:border-red-900/30 dark:bg-red-900/30">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-red-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700 dark:text-red-200">
                                    {formStatus.error}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {formStatus.success && (
                    <div className="mt-4 overflow-hidden rounded-lg border border-green-200 bg-green-50/80 p-4 backdrop-blur-sm dark:border-green-900/30 dark:bg-green-900/30">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-green-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700 dark:text-green-200">
                                    Comment submitted for moderation!
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
