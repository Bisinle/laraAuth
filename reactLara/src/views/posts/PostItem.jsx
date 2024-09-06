import React from "react";
import { Link } from "react-router-dom";

export default function PostItem({ post }) {
 
        return (
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {post.category.name}
                  </span>
                  <span className="text-gray-400 text-sm">{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <Link to={`/posts/${post.id}`} className="flex-grow">
                  <h2 className="text-xl font-bold text-gray-100 mb-3 line-clamp-2 hover:text-indigo-400 transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-4 line-clamp-3">{post.description}</p>
                </Link>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-semibold text-green-400 text-sm">
                   by {post.user.name}
                  </span>
                  <Link
                    to={`/posts/${post.id}`}
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-200"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
    );
}