import SearchInput from './sidebar/SearchInput'
import Conversation from './sidebar/Conversation'
import useGetConversations from '@/hooks/useGetConversations'
import { getRandomEmoji } from '@/utils/emojis'
import MessageContainer from './messages/MessageContainer'

const Messaging = () => {

    const { loading, conversations } = useGetConversations();

    return (
        <div className="w-full mt-7 ml-5 flex flex-col md:flex-row">
            <div className="md:w-2/5 h-full overflow-y-auto mb-5 md:mb-0">
                <div className="flex flex-col h-full">
                    <h2 className="h3-bold  mb-0 md:h2-bold w-full">Messages</h2>

                    <div className="mb-2">
                        <SearchInput />
                    </div>
                    <div className="divider mb-2"></div>
                    <div className="flex-1 overflow-y-auto">
                        <div className="py-2 flex flex-col space-y-2">
                            {conversations.map((conversation, idx) => (
                                <Conversation
                                    key={conversation._id}
                                    conversation={conversation}
                                    emoji={getRandomEmoji()}
                                    lastIdx={idx === conversations.length - 1}
                                />
                            ))}
                            {loading && <span className="loading loading-spinner mx-auto"></span>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-3/5 h-full overflow-y-auto">
                <div className="p-4 h-full">
                    {/* <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                        <div>
                            <p className="text-base font-semibold">Contact Name</p>
                            <p className="text-gray-500 text-sm">Active now</p>
                        </div>
                    </div> */}
                    <div className="overflow-y-auto">
                        <MessageContainer />

                        {/* <div className="flex flex-col space-y-2">
                            <div className="flex items-start">
                               <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                                <div className="bg-gray-200 p-2 rounded-lg">
                                    <p className="text-sm">Message text</p>
                                    <span className="text-xs text-gray-500">10:30 AM</span>
                                </div>
                                
                            </div>
                        </div> */}
                    </div>
                    {/* <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div> */}
                </div>
            </div>
        </div>


    )
}

export default Messaging
