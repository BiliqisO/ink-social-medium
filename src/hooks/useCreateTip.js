import { useCallback } from "react";
import { useConnection } from "../context/connection";

export const useCreateTip = () => {
  const { signedContract } = useConnection();

  const sendTip = useCallback(
    async (destinationAcct, amount, postId) => {
      if (!destinationAcct || !amount || !postId)
        return alert(
          "shey you no know say you suppose enter something ni 🤡🤡"
        );
      const contract = await signedContract();
      return contract.tipOnPost(destinationAcct, amount, postId);
    },
    [signedContract]
  );

  return sendTip;
};
