import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { format } from "date-fns";

export default function PostDetail() {
    const { id } = useParams();
    const [thisPostDetail, setThisPostDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 flex flex-col h-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-gray-700">
                        <div className="flex items-center flex-col mb-2 sm:mb-0">
                            <span className="font-semibold text-xl text-green-400 m mr-3">
                                {thisPostDetail.user?.name || "Anonymous"}
                            </span>
                            <span className="text-gray-400 text-sm">
                                {format(
                                    new Date(thisPostDetail.created_at),
                                    "MMMM d, yyyy"
                                )}
                            </span>
                        </div>
                        <span className="bg-indigo-600 text-xl text-white  font-semibold px-2 py-1 rounded-full">
                            {thisPostDetail.category?.name || "Uncategorized"}
                        </span>
                    </div>

                    <div className="flex justify-end gap-4 items-center mb-4">
                        <Link
                            to={`/posts/edit/${thisPostDetail.id}`}
                            className="text-indigo-400 text-2xl hover:text-indigo-300 mr-3"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => onDeleteClick(u)}
                            className="text-red-400 text-2xl hover:text-red-300"
                        >
                            Delete
                        </button>
                    </div>

                    <h2 className="text-xl font-bold text-gray-100 mb-3">
                        {thisPostDetail.title}
                    </h2>
                    <p className="text-gray-400 mb-4">
                        {thisPostDetail.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
