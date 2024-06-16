import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext2";

interface LoginResult {
  loading: boolean;
  login2: (username: string, password: string) => Promise<void>;
}

const useLogin = (): LoginResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();

  const login2 = async (username: string, password: string): Promise<void> => {
    const success = handleInputErrors(username, password);
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8800/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error("error");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login2 };
};

export default useLogin;

function handleInputErrors(username: string, password: string): boolean {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
