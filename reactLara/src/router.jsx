import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/users/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import DashBoard from "./views/DashBoard";
import UserEdit from "./views/users/UserEdit";
import UserForm from "./views/users/UserForm";
import PostsList from "./views/posts/PostsList";
import PostDetail from "./views/posts/PostDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/users" />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/dashBoard",
                element: <DashBoard />,
            },
            {
                path: "/users/new",
                element: <UserForm key="userCreate" />,
            },
            {
                path: "/users/:id",
                element: <UserForm key="userUpdate" />,
            },
            ,
            {
                path: "/posts",
                element: <PostsList />,
            },
            ,
            {
                path: "/posts/:id",
                element: <PostDetail />,
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
