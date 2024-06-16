import { useEffect } from "react";

import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/zustand/useConversation";

// import notificationSound
import { Message } from "postcss";

const useListenMessages = (): void => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		const handleNewMessage = (newMessage: Message): void => {
			newMessage.shouldShake = true;
			// const sound = new Audio(notificationSound);
			// sound.play();
			setMessages([...messages, newMessage]);
		};

		if (socket) {
			socket.on("newMessage", handleNewMessage);
		}

		return () => {
			if (socket) {
				socket.off("newMessage", handleNewMessage);
			}
		};
	}, [socket, setMessages, messages]);
};

export default useListenMessages;
