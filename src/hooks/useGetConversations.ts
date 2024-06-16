import { useState, useEffect } from 'react';

interface ConversationType {
    _id: string;
    fullName: string;
    profilePic: string;
    // Add other properties if available
}

const useGetConversations = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [conversations, setConversations] = useState<ConversationType[]>([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const userIdItem = localStorage.getItem("userId");
                const userId: string = userIdItem ? JSON.parse(userIdItem) : "";
                const res = await fetch(`http://localhost:8800/api/messaging/users?userId=${userId}`);
                const data = await res.json();
                console.log(data);
                if (data.error) {
                    throw new Error(data.error);
                }
                // Transform fetched data to match ConversationType
                const transformedConversations = data.map((conversation: any) => ({
                    _id: conversation._id,
                    fullName: conversation.fullName, // Adjust to match ConversationType
                    profilePic: conversation.profilePic,
                }));
                setConversations(transformedConversations);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};

export default useGetConversations;
