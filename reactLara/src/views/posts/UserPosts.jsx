import React, { useCallback, useEffect, useState } from "react";
import CreatPostButton from "./CreatPostButton";
import PostItem from "./PostItem";
import axiosClient from "../../axiosClient";

function UserPosts() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState(null);
  console.log(currentUser);

  const fetchUserPosts = useCallback(async () => {
    if (!currentUser || !currentUser.id) {
      setError("User not found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axiosClient.get(`/users/${currentUser.id}`);

      if (response.data && response.data.data.posts) {
        setUserPosts(response.data.data.posts);
        // console.log(response.data.data);
      } else {
        setError("No posts found");
      }
    } catch (err) {
      setError(
        "Failed to fetch posts: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  console.log(userPosts);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  if (!userPosts || userPosts.length === 0) {
    return (
      <div  className=" flex justify-between ">
        <p className="flex justify-self-center items-center mt-4 text-red-500 text-3xl font-bold ">No posts found.</p>
         <CreatPostButton />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-3">
          <h1 className="font-bold text-3xl text-indigo-900">My Posts ({userPosts.length})</h1>
  
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPosts.map((post) => (
            <PostItem key={post.id} post={post} userName={currentUser.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserPosts;
