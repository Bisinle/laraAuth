import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
    const onSubmit = (ev) => {
        ev.preventDefault;
    };
    return (
        
                <form action="" onSubmit={onSubmit}>
                    <h1 className="title"> Sign up for free</h1>
                    <input type="text" placeholder=" Full Name" />
                    <input type="Email" placeholder="Email Address" />
                    <input type="password" placeholder="password" />
                    <input type="password" placeholder="password Confirm" />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        All ready Registered?
                        <   Link to="/login">Sign in</Link>
                    </p>
                </form>
         
    );
}
