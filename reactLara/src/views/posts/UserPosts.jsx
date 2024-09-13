import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axiosClient";

function UserPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user")).id;
    getCurrentUserPosts(id);
  }, []);

  const getCurrentUserPosts = (id) => {
    if (id) {
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          console.log(data);

          setUserPosts(data.data); // Assuming the post is in data.data
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch post");
          setLoading(false);
        });
    }
  };
  console.log(userPosts);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      {/* {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between gap-3">
            <h1 className="font-bold text-3xl text-indigo-900">All Posts</h1>
            <CreatPostButton />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      {meta && <Pagination meta={meta} onPageChange={onPageChange} />} */}
    </div>
  );
}

export default UserPosts;
