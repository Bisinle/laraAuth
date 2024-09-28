import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { createRef } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useState } from "react";

export default function Login() {
    const emailRef = createRef();
    const passwordRef = createRef();
    const { setCurrentUser, setToken } = useStateContext();
    const [message, setMessage] = useState(null);

    const onSubmit = async (ev) => {
        ev.preventDefault();

        const credentials = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        console.log(credentials);
        
        try {
            axiosClient.post("/login", credentials).then(({ data }) => {
                // console.log(data.user.posts.category);
                localStorage.setItem("user", JSON.stringify(data.user));
                setCurrentUser(data.user);
                setToken(data.token);
            });
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setMessage(response.data.message);
            }
        }
        
    };

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Login into your account</h1>

            {message && (
                <div className="alert">
                    <p>{message}</p>
                </div>
            )}

            <input
                autoComplete="on"
                ref={emailRef}
                type="email"
                placeholder="Email"
            />
            <input
                autoComplete="on"
                ref={passwordRef}
                type="password"
                placeholder="Password"
            />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not registered? <Link to="/signup">Create an account</Link>
            </p>
        </form>
    );
}
