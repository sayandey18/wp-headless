import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LeaveCommentMutation } from '@/fragments/mutations';

export default function CommentBox({ postId }) {
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
                        commentOn: postId,
                        content: formValues.content,
                        author: formValues.author,
                        authorEmail: formValues.email
                    }
                }
            });

            if (data.createComment.success) {
                setFormStatus({ loading: false, error: null, success: true });
                setFormValues({ author: '', email: '', content: '' });
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
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="author"
                    placeholder="Name"
                    value={formValues.author}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <textarea
                    name="content"
                    placeholder="Your comment..."
                    value={formValues.content}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <button type="submit" disabled={formStatus.loading}>
                {formStatus.loading ? 'Submitting...' : 'Post Comment'}
            </button>

            {formStatus.error && (
                <p className="mt-2 text-red-500">Error: {formStatus.error}</p>
            )}

            {formStatus.success && (
                <p className="mt-2 text-green-500">
                    Comment submitted for moderation!
                </p>
            )}
        </form>
    );
}
