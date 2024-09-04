import React, { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: null,
    token: null,
    SetUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, SetUser] = useState({
        name:'John',
    });
    const [token, _setToken] = useState(null);
    // debugger;
    const setToken = () => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };
    return (
        <StateContext.Provider
            value={{
                user,
                token,
                SetUser,
                setToken,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
