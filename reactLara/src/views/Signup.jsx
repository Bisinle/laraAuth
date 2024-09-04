import React from "react";
import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from '../contexts/ContextProvider';

import axiosClient from "../axiosClient";

export default function Signup() {
    //^ create refs for each field --------------------------------------------------->
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    //^ get context states --------------------------------------------------->
    // const { setUser, setToken } = useStateContext();
    const {setUser,setToken}=useStateContext()
    const [errors, setErrors] = useState(null);

    //^ On submit function --------------------------------------------------->
    const onSubmit = (ev) => {
        ev.preventDefault();

        //^ get all input current value using ref --------------------------------------------------->
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        console.log(payload)
        //^ post the data to api  --------------------------------------------------->
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {//^ 422= validation error
                    setErrors(response.data.errors);
                }
            });
    };
    return (
        <form  onSubmit={onSubmit}>
            <h1 className="title"> Sign up for free</h1>
            <input ref={nameRef} type="text" placeholder=" Full Name" />
            <input ref={emailRef} type="Email" placeholder="Email Address" />
            <input ref={passwordRef} type="password" placeholder="password" />
            <input
                ref={passwordConfirmationRef}
                type="password"
                placeholder="password Confirm"
            />
            <button className="btn btn-block">Signup</button>
            <p className="message">
                All ready Registered?
                <Link to="/login">Sign in</Link>
            </p>
        </form>
    );
}
