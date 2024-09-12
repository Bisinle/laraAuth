import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import PostItem from "./PostItem";
import Pagination from "./Pagination";
import CreatPostButton from "./CreatPostButton";

export default function PostsList() {
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setCurrentUserPosts } = useStateContext();
    const [meta, setMeta] = useState(null);

    //^ when component mounts, fetch run the fetchPosts function------------------------------------>
    useEffect(() => {
        fetchPosts();
    }, []);

    //^ fetch posts function ------------------------------------------------------------------------->
    const fetchPosts = async (page = 1) => {
        try {
            const { data } = await axiosClient.get(`/posts?page=${page}`);
            setLoading(false);
            // Assuming the current user's ID is stored somewhere, e.g., in localStorage
            const currentUserId = JSON.parse(localStorage.getItem("user")).id;
            // Filter posts to only include those belonging to the current user
            const userPosts = data.data.filter(
                (post) => post.user_id === currentUserId
            );
            setCurrentUserPosts(userPosts);
            setAllPosts(data.data);
            setMeta(data.meta);
        } catch (err) {
            setLoading(false);
            setError("Failed to fetch posts");
        }
    };

    //^ each time the page number changes, update the ------------------------------------------------>
    //^ below function and pass the new page number to fetposts
    const onPageChange = (pageNumber) => {
        fetchPosts(pageNumber);
    };

    console.log(allPosts);

    return (
        <div className="container mx-auto px-4 py-8 ">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            ) : (
                <div className=" flex flex-col gap-3">
                    <div className=" flex justify-between gap-3">
                        <h1 className=" font-bold text-3xl text-white">
                            All Posts
                        </h1>
                        <CreatPostButton />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allPosts.map((post) => (
                            <PostItem key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            )}

            {meta && <Pagination meta={meta} onPageChange={onPageChange} />}
        </div>
    );
}

// {
//     /* <Link to={`/posts/${post.id}`}>{post.title}</Link> */
// }
// const onDeleteClick = (user) => {
//     // if (!window.confirm("Are you sure you want to delete this user?")) {
//     //   return
//     // }
//     axiosClient.delete(`/users/${user.id}`).then(() => {
//         setNotificationOnDelete("User was successfully deleted");
//         getUsers();
//         // const usersUpdated = users.filter(u => u.id !== user.id)
//         // setUsers(usersUpdated)
//     });
// };

//     return (
//         <div>

//         </div>
//     );
// }
