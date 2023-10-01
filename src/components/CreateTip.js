import React, { useState } from "react";
import { useConnection } from "../../src/context/connection";
import { useCreateTip } from "../hooks/useCreateTip";

export default function CreateTip({ destAcct, id }) {
  const tipOnPost = useCreateTip();
  const { active, account } = useConnection();
  const [amount, setAmount] = useState(0);

  const handleSendTip = async () => {
    if (!active) return console.log("please, connect");
    if (destAcct.toLowerCase() === account.toLowerCase())
      return alert("you cannot tip yourself");
    if (!amount)
      return alert("shey you no know say you suppose enter something ni 🤡🤡");

    try {
      await tipOnPost(destAcct, amount, id);
    } catch (error) {
      console.log("error: ", error);
      if (error.info.error.code === 4001) {
        return alert("You rejected the request");
      }
      alert("something went wrong");
    }
  };
  return (
    <>
      <label> Tip Post 👇🏼</label>
      <div className="tip-form">
        <input
          name="name"
          value={amount}
          style={{ paddingRight: "4px", paddingTop: "5px" }}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
        />
        <button
          value="Submit"
          type="submit"
          onClick={() => handleSendTip()}
        >
          SEND TIP
        </button>
      </div>

      {/* <p>{destinationAcct}</p> */}
    </>
  );
}
