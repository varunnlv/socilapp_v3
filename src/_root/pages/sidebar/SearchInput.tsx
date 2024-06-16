import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "@/zustand/useConversation";
import useGetConversations from "@/hooks/useGetConversations";
import toast from "react-hot-toast";

interface Conversation {
	fullName: string;
	// Add other properties if available
}

const SearchInput = () => {
	const [search, setSearch] = useState<string>("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const foundConversation = conversations.find((c: Conversation) =>
			c.fullName.toLowerCase().includes(search.toLowerCase())
		);

		if (foundConversation) {
			setSelectedConversation(foundConversation);
			setSearch("");
		} else {
			toast.error("No such user found!");
		}
	};

	return (
		<form onSubmit={handleSubmit} className='w-full flex items-center gap-2'>
			<input
				type='text'
				placeholder='   Search…'
				className='w-full h-9 input input-bordered'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-9 outline-none' />
			</button>
		</form>
	);
};

export default SearchInput;
