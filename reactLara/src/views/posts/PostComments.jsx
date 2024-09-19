import React from "react";

function PostComments({ comments }) {
  
  return <div>{comments.map((comment) => <p key={comment.id}>{comment.content}</p>)}</div>;
}

export default PostComments;
