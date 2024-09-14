import React from "react";
import { Link } from "react-router-dom";
import categoryContext from "../../contexts/categoryContext";

export default function PostItem({ post,userName }) {
//   const { categories, categoryError, categoryLoading } = categoryContext();
// console.log(categories);

 
        return (
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 border border-gray-200">
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {post.category.name ? post.category.name : categories[post.category_id].name}
              </span>
              <span className="text-gray-500 text-sm">{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <Link to={`/posts/${post.id}`} className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-indigo-600 transition-colors duration-200">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
            </Link>
            <div className="mt-auto flex items-center justify-between">
              <span className="font-semibold text-indigo-600 text-sm">
                by {userName}
              </span>
              <Link
                to={`/posts/${post.id}`}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-200"
              >
                Read more →
              </Link>
            </div>
          </div>
        </div>
    );
}
