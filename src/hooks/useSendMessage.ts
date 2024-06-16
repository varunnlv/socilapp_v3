import { useState } from "react";
import useConversation from "@/zustand/useConversation";
import toast from "react-hot-toast";

interface SendMessageResponse {
	error?: string;
	// Define other properties if returned from the API
}

interface SendMessageHook {
	sendMessage: (message: string) => Promise<void>;
	loading: boolean;
}

const useSendMessage = (): SendMessageHook => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message: string): Promise<void> => {
		setLoading(true);
		try {

			const userIdItem = localStorage.getItem("userId");
			const userId: string = userIdItem ? JSON.parse(userIdItem) : "";
			const res = await fetch(`http://localhost:8800/api/messaging/send/${selectedConversation._id}?userId=${userId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data: SendMessageResponse = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};

export default useSendMessage;
