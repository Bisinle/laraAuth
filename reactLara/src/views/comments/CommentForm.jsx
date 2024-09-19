import React, { useState } from "react";

const CommentForm = ({ onPostComment, parentId = null }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onPostComment({ content: comment, parentId });
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border-b border-gray-200">
      <textarea
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
        rows="4"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
