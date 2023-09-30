import { useCallback } from "react";
import { useConnection } from "../context/connection";

export const useCreatePost = () => {
  const { active, signedContract } = useConnection();

  const sendPost = useCallback(
    async (post) => {
      if (!post)
        return alert(
          "shey you no know say you suppose enter something ni 🤡🤡"
        );
      const contract = await signedContract();
      return contract.createPost(post);
    },
    [signedContract]
  );

  return sendPost;
};
