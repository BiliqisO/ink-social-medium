import React, { useState } from "react";
import "./CreatePost.css";
import { useConnection } from "../../context/connection";
import { useCreatePost } from "../../hooks/useCreatePost";

export default function CreatePost() {
  const createPost = useCreatePost();
  const { account, active } = useConnection();
  const [modal, setModal] = useState(false);
  const [post, setPost] = useState("The day is bright");
  const [sendingTx, setSendingTx] = useState(false);

  const handleSendPost = async (e) => {
    e.preventDefault();
    if (!post)
      return alert("shey you no know say you suppose enter something ni 🤡🤡");
    if (!active) return alert("please, connect");
    try {
      setSendingTx(true);
      const tx = await createPost(post);
      setModal(!modal);
      const receipt = await tx.wait();

      if (receipt.status === 0) return alert("tx failed");
      alert("ink posted!!");
    } catch (error) {
      console.log("error: ", error);
      if (error.info.error.code === 4001) {
        return alert("You rejected the request");
      }
      alert("something went wrong");
    } finally {
      setSendingTx(false);
      setModal(!modal);
    }
  };
  const toggleModal = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {active && (
        <button
          onClick={toggleModal}
          className="btn-modal button-62"
        >
          SHARE INK HERE
        </button>
      )}
      {modal && (
        <div className="modal">
          <div
            onClick={toggleModal}
            className="overlay"
          ></div>
          <div className="modal-content">
            <h2>
              Hello {account.substring(0, 6)}...{account.substring(38)}
            </h2>
            <form onSubmit={handleSendPost}>
              <label>
                ✒️
                <textarea
                  rows="4"
                  cols="50"
                  // className="ink"
                  type="text"
                  name="name"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                />
              </label>

              <button
                value="Submit"
                type="submit"
              >
                POST INK
              </button>
            </form>
            <button
              className="close-modal"
              onClick={toggleModal}
            >
              PROFILE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
