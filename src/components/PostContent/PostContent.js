import "./PostContent.css";
import useGetPosts from "../../hooks/useGetPosts";
import { useConnection } from "../../context/connection";

import { Link } from "react-router-dom";

export default function PostContent() {
  const { active } = useConnection();
  const getPosts = useGetPosts();

  const showPost = getPosts.map((show) => {
    return (
      <div
        className="container-card  gradient-cards card "
        key={show.id}
      >
        <Link to={`/post/${show.id}`}>
          <p className="container-title">
            {" "}
            {show.poster} <span>inked</span>{" "}
          </p>
          <p className="">{show.content}</p>
        </Link>
      </div>
    );
  });

  return (
    <div className="container">
      {active ? (
        showPost
      ) : (
        <div className="user-page">
          <h1> WELCOME TO INK SOCIAL MEDIUM ✒️</h1>
          <p>Connect wallet to show friends inks</p>
        </div>
      )}
    </div>
  );
}
