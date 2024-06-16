
import { extractTime } from "@/utils/extractTime";
import useConversation from "@/zustand/useConversation";

interface Props {
	message: MessageType;
}


const Message: React.FC<Props> = ({ message }) => {
	const { selectedConversation } = useConversation();

	const userString = localStorage.getItem("chat-user");
	const user = userString ? JSON.parse(userString) : null;

	const fromMe = user && message.senderId === user?._id; // Check if authUser exists before accessing its properties
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName} relative mb-2 flex items-start justify-${fromMe ? 'end' : 'start'}`}>
			<div className={`chat-image avatar ${fromMe ? 'ml-2' : 'mr-2'}`}>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			{/* <div className={` h-auto mb-2 text-white ${shakeClass} p-3 bg-opacity-50 bg-gray-300 rounded-lg relative ${fromMe ? 'ml-2' : 'mr-2'}`}>
				{message.message}
				<div className="absolute bottom-0 right-0 text-black text-xs p-1 rounded-tl-md mt-1">
					{formattedTime}
				</div>
			</div> */}

			<div className="bg-gray-200 p-2 rounded-lg text-white ${shakeClass} bg-opacity-50 bg-gray-300 rounded-lg relative ${fromMe ? 'ml-2' : 'mr-2'}`}">
				<p className="text-sm ">{message.message}</p>
				<span className="text-xs text-black">{formattedTime}</span>
			</div>
		</div>





	);
};

export default Message;
