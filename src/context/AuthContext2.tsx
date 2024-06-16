import React, { createContext, useContext, useState } from "react";

interface User {
	profilePic: string; // Changed to string
	_id: string; // Assuming _id is a string
	name: string; // Assuming name is a string
	// Add more properties if needed
}

interface AuthContextType {
	authUser: User | null;
	setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType>({
	authUser: null,
	setAuthUser: () => { },
});

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [authUser, setAuthUser] = useState<User | null>(() => {
		const user = localStorage.getItem("chat-user");
		return user ? (JSON.parse(user) as User) : null;
	});

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};
