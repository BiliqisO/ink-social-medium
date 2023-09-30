import "./PostContent.css";
import useGetPosts from "../../hooks/useGetPosts";
import { useConnection } from "../../context/connection";

import CreateTip from "../CreateTip";

export default function PostContent() {
  const { active } = useConnection();
  const getPosts = useGetPosts();

  const showPost = getPosts.map((show) => {
    return (
      <div className=" container-card  gradient-cards card ">
        <p>{show.id}</p>
        <p className="container-title"> {show.poster} inked</p>
        <p className="">{show.content}</p>
        <CreateTip
          destAcct={show.poster}
          id={show.id}
        />
      </div>
    );
  });

  return (
    <div className="container">
      {active ? (
        showPost
      ) : (
        <div className="user-page">
          <h1> WELCOME TO INK MEDIUM ✒️</h1>
          <p>Connect wallet to show friends inks</p>
        </div>
      )}
    </div>
  );
}
