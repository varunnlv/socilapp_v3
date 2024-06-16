import SearchInput from './sidebar/SearchInput';
import Conversation from './sidebar/Conversation';
import useGetConversations from '@/hooks/useGetConversations';
import { getRandomEmoji } from '@/utils/emojis';
import MessageContainer from './messages/MessageContainer';

const Messaging = () => {
    const { loading, conversations } = useGetConversations();

    // Transform conversations to match ConversationType
    const transformedConversations = conversations.map(conversation => ({
        _id: conversation._id,
        name: conversation.fullName, // Assuming 'fullName' can be used as 'name'
        profilePic: conversation.profilePic,
    }));

    return (
        <div className="w-full mt-7 ml-5 flex flex-col md:flex-row">
            <div className="md:w-2/5 h-full overflow-y-auto mb-5 md:mb-0">
                <div className="flex flex-col h-full">
                    <h2 className="h3-bold mb-0 md:h2-bold w-full">Messages</h2>
                    <div className="mb-2">
                        <SearchInput />
                    </div>
                    <div className="divider mb-2"></div>
                    <div className="flex-1 overflow-y-auto">
                        <div className="py-2 flex flex-col space-y-2">
                            {transformedConversations.map((conversation, idx) => (
                                <Conversation
                                    key={conversation._id}
                                    conversation={conversation}
                                    emoji={getRandomEmoji()}
                                    lastIdx={idx === transformedConversations.length - 1}
                                />
                            ))}
                            {loading && <span className="loading loading-spinner mx-auto"></span>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-3/5 h-full overflow-y-auto">
                <div className="p-4 h-full">
                    <MessageContainer />
                </div>
            </div>
        </div>
    );
};

export default Messaging;
