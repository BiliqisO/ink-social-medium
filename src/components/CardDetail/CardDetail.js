import React from "react";
import "./CardDetail.css";
import { formatDate } from "../../hooks/useDate";

import { useParams } from "react-router-dom";

import useGetPost from "../../hooks/useGetPost";
import CreateTip from "../CreateTip";
const CardDetail = () => {
  let { id } = useParams();
  const post = useGetPost(id);

  return (
    <div className="post-container">
      <h3>{post.content}</h3>
      <p>ink from: {post.poster}</p>
      <p> Tip Balance: {post.tips}</p>
      <p> Date Inked: {formatDate(post.time)}</p>
      <CreateTip
        destAcct={post.poster}
        id={post.id}
      />
    </div>
  );
};

export default CardDetail;
