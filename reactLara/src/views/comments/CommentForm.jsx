import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";

const CommentForm = ({ onPostComment, parentId = null }) => {
  const [content, setContent] = useState("");
  const { user } = useStateContext(); // Assuming you have a user context

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return; // Prevent empty comments

    const newComment = {
      content: content.trim(),
      user_id: user.id, // Include the current user's ID
      parent_id: parentId,
    };
    console.log(newComment);

    // onPostComment(newComment);
    // setContent(""); // Clear the form after submission
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border-b border-gray-200">
      <textarea
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
        rows="4"
        placeholder={parentId ? "Write a reply..." : "Write a comment..."}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {parentId ? "Post Reply" : "Post Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
