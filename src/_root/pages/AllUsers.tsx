import { useToast } from "@/components/ui/use-toast"; // Importing useToast hook for displaying toasts
import Loader from "@/components/shared/Loader"; // Importing Loader component for displaying loading state
import UserCard from "@/components/shared/UserCard"; // Importing UserCard component for displaying user information
import { useGetUsers } from "@/lib/react-query/queriesAndMutations"; // Importing custom hook for fetching user data
import { useEffect, useState } from "react";
import axios from "axios";
import { Models } from "appwrite";

// Define the AllUsers component
const AllUsers = () => {
  const { toast } = useToast(); // Initializing toast function from useToast hook

  // Fetching user data using useGetUsers hook
  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();


  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8800/api/users/users", {
      withCredentials: true,
    })
      .then(response => {
        console.log("trying to log in");

        // Assuming you have a property like 'success' in your response
        if (response.data && response.data.success) {
          console.log("Login successful", response.data);

          const firstTenUsers = response.data.slice(0, 10);
          console.log("Login successful2", firstTenUsers);
          setUsers(firstTenUsers);

          // setUsers(response.data.users);
          // Do something with the response data if needed
        } else {
          console.log("Login unsuccessful", response.data);
          const firstTenUsers = response.data.slice(0, 10);
          console.log("Login successful2", firstTenUsers);
          setUsers(firstTenUsers);
          // Handle unsuccessful login
        }
      })
      .catch(error => {
        // Handle error, if necessary
        console.error("Error occurred while trying to log in:", error);
      });
  }, []); // Empty

  // Handling error state
  if (isErrorCreators) {
    // Displaying toast message when there's an error fetching users
    toast({ title: "Something went wrong." });
    return; // Exiting early if there's an error
  }

  // Rendering component
  return (
    <div className="common-container">
      <div className="user-container">
        {/* Heading */}
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>

        {/* Displaying loading state or user data */}
        {isLoading && !creators ? ( // If loading or creators data is not available
          // Display Loader component
          <Loader />
        ) : (
          // If loading is complete and creators data is available
          <ul className="user-grid">
            {/* Mapping through the list of creators and rendering UserCard for each */}
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full">
                {/* Rendering UserCard component with user data */}
                <UserCard user={creator} />
              </li>
            ))}

            {users.map((user: Models.Document) => (
              <li key={user.$id}>
                <UserCard user={user} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers; // Exporting the AllUsers component
