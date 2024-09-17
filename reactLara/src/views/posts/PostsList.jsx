import React, { useEffect, useState, useCallback } from "react";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contexts/ContextProvider";
import PostItem from "./PostItem";
import Pagination from "./Pagination";

export default function PostsList() {
  const [allPosts, setAllPosts] = useState([]);
  const [error, setError] = useState(null);
  const { setUserPosts, setLoading, loading } = useStateContext();
  const [meta, setMeta] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const fetchPosts = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        const { data } = await axiosClient.get(`/posts?page=${page}`);

        const userPosts = data.data.filter(
          (post) => post.user.id === currentUser.id
        );

        setUserPosts(userPosts);
        setAllPosts(data.data);
        setMeta(data.meta);
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setUserPosts]
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const onPageChange = useCallback(
    (pageNumber) => {
      fetchPosts(pageNumber);
    },
    [fetchPosts]
  );

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }
  console.log(allPosts);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between gap-3">
            <h1 className="font-bold text-3xl text-indigo-900">All Posts</h1>
           
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map((post) => (
              <PostItem key={post.id} post={post} userName={currentUser.name} />
            ))}
          </div>
        </div>
      )}

      {meta && <Pagination meta={meta} onPageChange={onPageChange} />}
    </div>
  );
}
