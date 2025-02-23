import { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { SubmitGfFormMutation } from '@/graphql/mutations';

import Button from '@/components/Button';
import SuccessMessage from '@/components/Message/SuccessMessage';
import ErrorMessage from '@/components/Message/ErrorMessage';

function MailIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path
                d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
                className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
            />
            <path
                d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
                className="stroke-zinc-400 dark:stroke-zinc-500"
            />
        </svg>
    );
}

function LodingSpinner(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
            <circle
                className="opacity-0"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            ></circle>
            <path
                className="fill-zinc-300 dark:fill-zinc-100/30"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
}

export default function Newsletter({ form }) {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const timeoutRef = useRef(null);

    // Add HTML stripping function
    const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '');
    };

    const emailField = form?.formFields?.edges?.find(
        (field) => field.node.inputType === 'EMAIL'
    )?.node;

    const [submitForm, { loading }] = useMutation(SubmitGfFormMutation);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setErrorMessage('');
        setSuccessMessage('');

        if (!email) {
            setErrorMessage('Please enter a valid email.');

            timeoutRef.current = setTimeout(() => {
                setErrorMessage('');
            }, 4000);
            return;
        }

        try {
            const {
                data: { submitGfForm }
            } = await submitForm({
                variables: {
                    input: {
                        id: form?.databaseId,
                        fieldValues: [
                            {
                                id: emailField?.databaseId,
                                emailValues: {
                                    value: email
                                }
                            }
                        ]
                    }
                }
            });

            if (submitGfForm.errors) {
                const errorMessage = submitGfForm.errors
                    .map((e) => stripHtml(e.message))
                    .join(', ');
                setErrorMessage(
                    stripHtml(errorMessage) || 'Form submission failed!'
                );

                timeoutRef.current = setTimeout(() => {
                    setErrorMessage('');
                }, 4000);
            } else {
                setEmail('');
                const successMessage = submitGfForm.confirmation?.message;
                setSuccessMessage(
                    stripHtml(successMessage) || 'Thank you for subscribing!'
                );

                timeoutRef.current = setTimeout(() => {
                    setSuccessMessage('');
                }, 4000);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(
                stripHtml(error.message) || 'Failed to subscribe newsletter.'
            );

            timeoutRef.current = setTimeout(() => {
                setErrorMessage('');
            }, 4000);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700/40 dark:bg-zinc-800"
        >
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <MailIcon className="h-6 w-6 flex-none" />
                <span className="ml-3">{form?.title || 'Stay up to date'}</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {form?.description ||
                    'Get notified when I publish something new, and unsubscribe at any time.'}
            </p>
            {emailField && (
                <>
                    <div className="mt-6 flex gap-3">
                        <input
                            type="email"
                            value={email}
                            placeholder={emailField?.placeholder}
                            aria-label={emailField?.placeholder}
                            required={emailField?.isRequired}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-10/12 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(--spacing(2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 focus:outline-hidden sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
                        />
                        <Button
                            type="submit"
                            className="w-2/12 flex-none cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? (
                                <LodingSpinner className="size-5 animate-spin" />
                            ) : (
                                form?.submitButton?.text || 'Join'
                            )}
                        </Button>
                    </div>

                    {successMessage && (
                        <SuccessMessage>{successMessage}</SuccessMessage>
                    )}
                    {errorMessage && (
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    )}
                </>
            )}
        </form>
    );
}
