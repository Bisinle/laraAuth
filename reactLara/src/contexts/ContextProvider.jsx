import React, { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: null,
    token: null,
    setCurrentUser: () => {},
    setToken: () => {},
    setCurrentUserPosts: () => {},
    setNotificationOnDelete: () => {},
    setAllCategories: () => {},
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [allCategories, setAllCategories] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [notification, setNotification] = useState("");
    const [currentUserPosts, setCurrentUserPosts] = useState({});

    const setTokenAndLocalStorage = (newToken) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem("ACCESS_TOKEN", newToken);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setNotificationOnDelete = (message) => {
        setNotification(message);

        setTimeout(() => {
            setNotification("");
        }, 2000);
    };

    return (
        <StateContext.Provider
            value={{
                token,
                notification,
                currentUser,
                setCurrentUser,
                currentUserPosts,
                allCategories,
                setToken: setTokenAndLocalStorage,
                setNotificationOnDelete,
                setCurrentUserPosts,
                setAllCategories,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
