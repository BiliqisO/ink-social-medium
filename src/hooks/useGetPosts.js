import { useEffect, useState } from "react";
import { useConnection } from "../context/connection";

function useGetPosts() {
  const [posts, setPosts] = useState([]);
  const { readOnlyContract, account, active } = useConnection();

  useEffect(() => {
    const showPosts = async () => {
      try {
        const contract = await readOnlyContract();
        const allPosts = await contract.getUserPosts(account);
        const postDetails = allPosts.map((details) => ({
          id: Number(details.id),
          poster: details.poster,
          content: details.content,
        }));
        console.log(postDetails);
        setPosts(postDetails);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
      // return posts;
    };
    showPosts();
  }, [active]);
  return posts;
}
export default useGetPosts;
