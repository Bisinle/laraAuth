import React from "react";
import { Link } from "react-router-dom";

export default function CreatPostButton() {
    return (
        <Link
            to="/posts/create"
            className=" font-bold text-xl text-white  rounded-md px-3 flex justify-center items-center bg-indigo-600 "
        >
            Create Post
        </Link>
    );
}
