import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import DashBoard from "./views/DashBoard";
import PostsList from "./views/posts/PostsList";
import PostDetail from "./views/posts/PostDetail";
import PostForm from "./views/posts/PostForm";
import Settings from "./views/Settings";
import UserPosts from "./views/posts/UserPosts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/posts" />,
            },
            {
                path: "/dashBoard",
                element: <DashBoard />,
            },
            {
                path: "/home",
                element: <UserPosts />,
            },
            {
                path: "/posts",
                element: <PostsList />,
            },
            ,
            {
                path: "/posts/:id",
                element: <PostDetail />,
            },
            ,
            {
                path: "/posts/edit/:id",
                element: <PostForm key="postUpdate" />,
            },
            {
                path: "/posts/create",
                element: <PostForm key="postCreate" />,
            },
            {
                path: "/settings",
                element: <Settings  />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },

    {
        path: "/*",
        element: <NotFound />,
    },
]);

export default router;
