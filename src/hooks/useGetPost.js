import { useEffect, useState } from "react";
import { useConnection } from "../context/connection";
import { formatEther } from "ethers";

function useGetPost(id) {
  const [post, setPost] = useState([]);
  const { readOnlyContract, active } = useConnection();

  useEffect(() => {
    const showPost = async () => {
      const postId = Number(id);
      try {
        const contract = await readOnlyContract();
        const postStruct = await contract.getPost(postId);
        const postDetail = {
          id: postId,
          poster: postStruct.poster,
          content: postStruct.content,
          time: Number(postStruct.timePosted),
          tips: formatEther(postStruct.tips),
        };
        // console.log(postDetail);
        setPost(postDetail);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
      //   return post;
    };
    showPost();
  }, [id, active, readOnlyContract]);
  return post;
}
export default useGetPost;
