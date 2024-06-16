import { Models } from "appwrite";

// import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/shared/Loader";
import Postcard from "@/components/shared/Postcard";
import UserCard from "@/components/shared/UserCard";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queriesAndMutations";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  // const { toast } = useToast();
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





  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">

      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <Postcard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
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

export default Home;
