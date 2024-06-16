import { useEffect, useState } from "react";

interface Conversation {
	_id: string;
	fullName: string;
	profilePic: string;
	// Add other properties if available
}

const useGetConversations = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [conversations, setConversations] = useState<Conversation[]>([]);

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
				setConversations(data);
			} catch (error) {

			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversations;
