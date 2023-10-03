import { useCallback } from "react";
import { useConnection } from "../context/connection";
import { parseEther } from "ethers";

export const useCreateTip = () => {
  const { signedContract, connectToTokenContract } = useConnection();

  const sendTip = useCallback(
    async (destinationAcct, amount, postId) => {
      console.log("connecting to contract ");
      const contract = await signedContract();
      const tokenContract = await connectToTokenContract();
      console.log({ contract, tokenContract });

      const appr = await tokenContract.approve(
        contract.target,
        parseEther(amount)
      );
      await appr.wait();

      const tx = await contract.tipOnPost(
        destinationAcct,
        parseEther(amount),
        postId
      );
      const receipt = await tx.wait();
      if (receipt.status === 0) return alert("tx failed");
      alert("tip sent!!");
    },
    [connectToTokenContract, signedContract]
  );
  return sendTip;
};
// const allowance = await tokenContract.allowance(account, contract.target);
// if (amount > Number(allowance))
//   return alert("amount greater than approved amount ");
