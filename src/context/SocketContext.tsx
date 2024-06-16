// import { createContext, useState, useEffect, useContext } from "react";
// // import { useAuthContext } from "./AuthContext";
// import io from "socket.io-client";

// const SocketContext = createContext();

// export const useSocketContext = () => {
// 	return useContext(SocketContext);
// };

// export const SocketContextProvider = ({ children }) => {
// 	const [socket, setSocket] = useState(null);
// 	const [onlineUsers, setOnlineUsers] = useState([]);
// 	// const { authUser } = useAuthContext();

// 	// useEffect(() => {
// 	// 	if (authUser) {
// 	// 		const socket = io("https://chat-app-yt.onrender.com", {
// 	// 			query: {
// 	// 				userId: authUser._id,
// 	// 			},
// 	// 		});

// 	// 		setSocket(socket);

// 	// 		// socket.on() is used to listen to the events. can be used both on client and server side
// 	// 		socket.on("getOnlineUsers", (users) => {
// 	// 			setOnlineUsers(users);
// 	// 		});

// 	// 		return () => socket.close();
// 	// 	} else {
// 	// 		if (socket) {
// 	// 			socket.close();
// 	// 			setSocket(null);
// 	// 		}
// 	// 	}
// 	// }, [authUser]);

// 	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
// };





import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useAuthContext } from "./AuthContext2"
import io, { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: any[]; // Define type for onlineUsers if needed
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
});

export const useSocketContext = (): SocketContextType => {
  return useContext(SocketContext);
};

interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContextProvider = ({ children }: SocketContextProviderProps): JSX.Element => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

  useEffect(() => {

    const userString = localStorage.getItem("chat-user");
    const user = userString ? JSON.parse(userString) : null;


    if (user) {
      const socket = io("http://localhost:8800/", {
        query: {
          userId: user._id,
        },
      });

      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users: any[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, []);

  return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
