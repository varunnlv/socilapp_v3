import { create } from "zustand";

interface ConversationState {
	selectedConversation: any; // Change 'any' to the appropriate type if possible
	setSelectedConversation: (selectedConversation: any) => void; // Change 'any' to the appropriate type if possible
	messages: any[]; // Change 'any' to the appropriate type if possible
	setMessages: (messages: any[]) => void; // Change 'any' to the appropriate type if possible
}

const useConversation = create<ConversationState>((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;
