
import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentList = ({ comments, userName, postId }) => {
  const topLevelComments = comments.filter(
    (comment) => comment.parent_id === null
  );

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 p-6 border-b border-gray-200">
        Comments ({comments.length})
      </h3>
      <CommentForm postId={postId} parentId={null} />
      <div className="divide-y divide-gray-200">
        {topLevelComments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            replies={comments.filter((reply) => reply.parent_id === comment.id)}
            allComments={comments}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
