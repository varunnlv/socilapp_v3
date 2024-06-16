import { useState } from 'react';
import useGetConversations from '@/hooks/useGetConversations';

interface ConversationType {
    _id: string;
    fullName: string;
    profilePic: string;
    // Add other properties if available
}

const SearchInput = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { conversations } = useGetConversations();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredConversations = conversations.filter((conversation: ConversationType) =>
        conversation.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            {/* Render filtered conversations */}
            {filteredConversations.map(conversation => (
                <div key={conversation._id}>
                    <p>{conversation.fullName}</p>
                    {/* Add additional rendering logic as needed */}
                </div>
            ))}
        </div>
    );
};

export default SearchInput;
