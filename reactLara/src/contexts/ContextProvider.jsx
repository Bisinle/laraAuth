import React, { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [notification, setNotification] = useState("");

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
        }, 5000);
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken: setTokenAndLocalStorage,
                setNotification: setNotificationOnDelete,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
