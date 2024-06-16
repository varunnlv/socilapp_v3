import React from "react";
import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/zustand/useConversation";

interface ConversationType {
	_id: string;
	name: string;
	profilePic: string;
	// Define other properties if available
}

interface ConversationProps {
	conversation: ConversationType;
	lastIdx: boolean;
	emoji: string;
}

const Conversation: React.FC<ConversationProps> = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
          ${isSelected ? "bg-sky-500" : ""}
        `}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full relative'>
						<img src={conversation.profilePic} alt='user avatar' />
						{isOnline && (
							<div className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full"></div>
						)} {/* Add online indicator */}
					</div>
				</div>


				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.name}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};

export default Conversation;
