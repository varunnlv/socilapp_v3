import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext2";

interface SignupData {
	name: string;
	username: string;
	password: string;
}

interface SignupResult {
	loading: boolean;
	signup: (data: SignupData) => Promise<void>;
}

const useSignup = (): SignupResult => {
	const [loading, setLoading] = useState<boolean>(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ name, username, password }: SignupData): Promise<void> => {
		const success = handleInputErrors({ name, username, password });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("http://localhost:8800/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, username, password }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			console.log("work is working")
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};

export default useSignup;

function handleInputErrors({ name, username, password }: SignupData): boolean {
	if (!name || !username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}
