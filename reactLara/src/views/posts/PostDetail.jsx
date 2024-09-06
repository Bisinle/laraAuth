import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";

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
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden ">
                <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            {thisPostDetail.category?.name || 'Uncategorized'}
                        </span>
                        <span className="text-gray-400 text-sm">
                            {new Date(thisPostDetail.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-100 mb-3 ">
                        {thisPostDetail.title}
                    </h2>
                    <p className="text-gray-400 mb-4">
                        {thisPostDetail.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                        <span className="font-semibold text-green-400 text-sm">
                            {thisPostDetail.user?.name || 'Anonymous'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}