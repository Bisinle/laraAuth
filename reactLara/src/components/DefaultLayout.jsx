import React, { useContext, useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axiosClient";

export default function DefaultLayout() {
    const { currentUser, token, setCurrentUser, setToken, notification } = useStateContext();

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
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/posts">Posts</Link>
                <Link to="/users">Users</Link>
            </aside>

            <div className="content">
                <header>
                    <div>HEADER</div>
                    <div>{currentUser.name}</div>
                    <a href="#" onClick={onLogout} className="btn-logout">
                        logout
                    </a>
                </header>
                {notification && (
                    <div className="notification">{notification}</div>
                )}
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
