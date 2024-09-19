import React, { useState } from "react";
import CommentForm from "./CommentForm";
import { format } from "date-fns";
import {RiThumbUpLine} from 'react-icons/ri';

const Comment = ({ comment, replies, allComments,likeCount }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReply = () => setIsReplying(!isReplying);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <article className="p-6">
      <div className="flex flex-row gap-3   mb-4">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src={comment.user?.profile_photo_url || "/default-avatar.jpg"}
        //   alt={comment.user?.name}
        />

        <div>
          <h4 className="font-semibold text-indigo-600">
            {comment.user?.name}
          </h4>
          <p className="text-gray-500 text-sm">
            {format(new Date(comment.created_at), "MMMM d, yyyy")}
          </p>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{comment.content}</p>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleReply}
          className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
        >
          Reply
        </button>
        {replies.length > 0 && (
          <button
            onClick={toggleExpand}
            className="text-indigo-500 hover:text-gray-700 font-medium text-sm"
          >
            {isExpanded ? "Hide replies" : `Show ${replies.length} replies`}
          </button>
          
        )}
        <button
            // onClick={toggleExpand}
            className="text-indigo-500 hover:text-gray-700 font-medium text-sm flex justify-center items-center gap-1"
          >
            <RiThumbUpLine/>
           {likeCount >=0 ? likeCount : 0}
          </button>
      </div>
      {isReplying && (
        <div className="mt-4">
          <CommentForm parentId={comment.id} postId={comment.post_id} />
        </div>
      )}
      {isExpanded && replies.length > 0 && (
        <div className="mt-4 ml-8 border-l-2 border-gray-200 pl-4">
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              replies={allComments.filter((r) => r.parent_id === reply.id)}
              allComments={allComments}
              likeCount={reply.likes}
            />
          ))}
        </div>
      )}
    </article>
  );
};

export default Comment;
