import React, { useState } from "react";
import { useConnection } from "../../src/context/connection";
import { useCreateTip } from "../hooks/useCreateTip";

export default function CreateTip({ id, destAcct }) {
  const tipOnPost = useCreateTip();
  const { account, active } = useConnection();
  const [modal, setModal] = useState(false);
  const [destinationAcct, setDestinationAcct] = useState();
  const [amount, setAmount] = useState();
  const [postId, setPostId] = useState();
  const [sendingTx, setSendingTx] = useState(false);

  const handleSendTip = async (e) => {
    e.preventDefault();

    setDestinationAcct(destAcct);
    console.log(destinationAcct);
    setPostId(id);
    console.log(postId);
    if (!destinationAcct || !amount || !postId)
      return alert("shey you no know say you suppose enter something ni 🤡🤡");
    if (!active) return alert("please, connect");

    try {
      setSendingTx(true);

      const tx = await tipOnPost(destinationAcct, amount, postId);
      const receipt = await tx.wait();
      if (receipt.status === 0) return alert("tx failed");
      alert("tweep sent!!");
      setModal(!modal);
    } catch (error) {
      console.log("error: ", error);
      if (error.info.error.code === 4001) {
        return alert("You rejected the request");
      }
      alert("something went wrong");
    } finally {
      setSendingTx(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSendTip}>
        <label> send Tip</label>
        <input
          name="name"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
        />
        <button
          value="Submit"
          type="submit"
        >
          TIP
        </button>
      </form>
      {/* <p>{destinationAcct}</p> */}
    </>
  );
}
