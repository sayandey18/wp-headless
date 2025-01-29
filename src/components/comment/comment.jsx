import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LeaveCommentMutation } from "@/fragments/mutations";

export default function Comment({ postId }) {
    const [formData, setFormData] = useState({
        author: "",
        email: "",
        content: ""
    });

    const [status, setStatus] = useState({
        error: null,
        success: false,
        loading: false
    });

    const [createComment] = useMutation(LeaveCommentMutation);

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        // Clear error when user starts typing
        if (status.error) {
            setStatus(prev => ({ ...prev, error: null }))
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null, success: false });

        try {
            const { data } = await createComment({
                variables: {
                    input: {
                        commentOn: postId,
                        content: formData.content,
                        author: formData.author,
                        authorEmail: formData.email
                    }
                }
            });

            if (data.createComment.success) {
                setStatus({ loading: false, error: null, success: true });
                setFormData({ author: "", email: "", content: "" });
            } else {
                throw new Error("Comment submission failed");
            }
        } catch (error) {
            setStatus({
                loading: false,
                error: error.message || "An error occurred",
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
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <textarea
                    name="content"
                    placeholder="Your comment..."
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <button
                type="submit"
                disabled={status.loading}
            >
                {status.loading ? 'Submitting...' : 'Post Comment'}
            </button>

            {status.error && (
                <p className="text-red-500 mt-2">Error: {status.error}</p>
            )}

            {status.success && (
                <p className="text-green-500 mt-2">
                    Comment submitted for moderation!
                </p>
            )}
        </form>
    );
}