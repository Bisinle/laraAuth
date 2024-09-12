import React, { useContext, useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axiosClient";


export default function DefaultLayout() {
    const { currentUser, token, setCurrentUser, setToken, notification } =
        useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setCurrentUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setCurrentUser(data);
        });
    }, []);
    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-indigo-700 text-white p-6">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold">Your App</h2>
                </div>
                <nav>
                    <Link to="/dashboard" className="flex items-center py-2 px-4 text-gray-300 hover:bg-indigo-600 rounded transition duration-150 ease-in-out">
                        <span className="mr-3">🏠</span>
                        Dashboard
                    </Link>
                    <Link to="/posts" className="flex items-center py-2 px-4 mt-2 text-gray-300 hover:bg-indigo-600 rounded transition duration-150 ease-in-out">
                        <span className="mr-3">📄</span>
                        Posts
                    </Link>
                    <Link to="/settings" className="flex items-center py-2 px-4 mt-2 text-gray-300 hover:bg-indigo-600 rounded transition duration-150 ease-in-out">
                        <span className="mr-3">⚙️</span>
                        Settings
                    </Link>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-md">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                        <div className="flex items-center">
                            <span className="mr-4 text-gray-600">{currentUser.name}</span>
                            <button onClick={onLogout} className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                                <span className="mr-2">🚪</span>
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {notification && (
                    <div className="bg-blue-500 text-white p-4">
                        {notification}
                    </div>
                )}

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}