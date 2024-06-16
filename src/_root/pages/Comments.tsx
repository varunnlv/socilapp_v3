import React, { useState, MouseEvent, ChangeEvent, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';
import { useUserContext } from '@/context/AuthContext';
import { User } from 'lucide-react';

// Define the Comment interface to describe the structure of a comment object
interface Comment {
    name: string;
    desc: string;
    profilePic: string;
    createdAt: string;
}

// Define the props interface for the Comments component
interface CommentsProps {
    postId: string; // ID of the post for which comments are being fetched
}

// Define the Comments component
const Comments: React.FC<CommentsProps> = ({ postId }) => {
    // Initialize state variables
    const [desc, setDesc] = useState<string>(''); // State variable for comment description
    const { user, user2, Postt } = useUserContext(); // Accessing user context data
    const queryClient = useQueryClient(); // Query client for react-query
    const [comments, setComments] = useState<Comment[]>([]); // State variable for comments
    const [isLoading, setIsLoading] = useState<boolean>(false); // State variable for loading status
    const [error, setError] = useState<Error | null>(null); // State variable for error

    // Fetch comments for the given post ID
    useEffect(() => {
        setIsLoading(true); // Set loading state to true
        setError(null); // Reset error state

        // Function to fetch comments asynchronously
        const fetchComments = async () => {
            try {
                await makeRequest.get(`/comments?postId=${postId}`) // Make GET request to fetch comments
                    .then((res) => setComments(res.data)) // Set comments state with fetched data
                    .catch((err) => setError(err)) // Handle error
                    .finally(() => setIsLoading(false)); // Set loading state to false after fetching
            } catch (err) {
                console.error('Error fetching comments:', err); // Log error if fetching fails
            }
        };

        fetchComments(); // Call the fetchComments function
    }, [postId]); // Run effect when postId changes

    // Function to handle adding a new comment
    const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await makeRequest.post('/comments', { desc, postId: Postt.postId, userId: user2.id }); // Make POST request to add comment
            console.log("postrequest:", response.data); // Log the response data

            setIsLoading(true); // Set loading state to true
            setError(null); // Reset error state

            // Refetch comments after adding a new one
            await makeRequest.get(`/comments?postId=${postId}`)
                .then((res) => setComments(res.data))
                .catch((err) => setError(err))
                .finally(() => setIsLoading(false)); // Set loading state to false after fetching
        } catch (err) {
            console.error('Error adding comment:', err); // Log error if adding comment fails
        }

        setDesc(''); // Reset the comment description input field
    };

    // Render the Comments component
    return (
        <div className="comments">
            <div className="write">
                <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                    alt="profile"
                    className="h-14 w-14 rounded-full" />
                <input
                    type="text"
                    placeholder="write a comment"
                    value={desc}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDesc(e.target.value)} // Handle input change event
                />
                <button onClick={handleClick}>Send</button> {/* Button to add comment */}
            </div>
            {/* Display loading state or comments */}
            {error ? ( // If there's an error
                <div>Something went wrong</div> // Display error message
            ) : isLoading ? ( // If comments are loading
                <div>Loading...</div> // Display loading message
            ) : (
                comments?.map((comment) => ( // Map through comments and render each
                    <div className="comment" key={comment.createdAt}>
                        <img src={`/upload/${comment.profilePic}`} alt="" />
                        <div className="info">
                            <span>{comment.name}</span>
                            <p>{comment.desc}</p>
                        </div>
                        <span className="date">{moment(comment.createdAt).fromNow()}</span> {/* Display comment creation time */}
                    </div>
                ))
            )}
        </div>
    );
};

export default Comments; // Export the Comments component
