import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { format } from "date-fns";
import CreatPostButton from "./CreatPostButton";
import { useStateContext } from "../../contexts/ContextProvider";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thisPostDetail, setThisPostDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showNotification } = useStateContext();

  useEffect(() => {
    if (id) {
      axiosClient
        .get(`/posts/${id}`)
        .then(({ data }) => {
          console.log(data);

          setThisPostDetail(data.data); // Assuming the post is in data.data
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch post");
          setLoading(false);
        });
    }
  }, [id]);

  const onDeleteClick = (post) => {
    axiosClient.delete(`/posts/${post.id}`).then(() => {
      showNotification("User was successfully deleted");
      navigate("/posts");
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!thisPostDetail) {
    return <div className="text-center">Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-auto flex mb-5 justify-end">
        <CreatPostButton />
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-indigo-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {thisPostDetail.category?.name || "Uncategorized"}
            </span>
            <div className="flex items-center space-x-4">
              <Link
                to={`/posts/edit/${thisPostDetail.id}`}
                className="text-indigo-600 hover:text-indigo-800 font-medium text-2xl"
              >
                <FaEdit />
              </Link>
              <button
                onClick={() => onDeleteClick(thisPostDetail)}
                className="text-red-600 hover:text-red-800 font-medium text-2xl"
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {thisPostDetail.title}
          </h2>

          <div className="flex items-center mb-6">
            <span className="font-semibold text-indigo-600 mr-3">
              {thisPostDetail.user?.name || "Anonymous"}
            </span>
            <span className="text-gray-500 text-sm">
              {format(new Date(thisPostDetail.created_at), "MMMM d, yyyy")}
            </span>
          </div>

          <p className="text-gray-600 mb-6 text-lg">
            {thisPostDetail.description}
          </p>
        </div>
      </div>
    </div>
  );
}
