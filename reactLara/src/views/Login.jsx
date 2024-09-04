import React from "react";
import { Link } from "react-router-dom";

function Login() {
    const onSubmit = (ev) => {
        ev.preventDefault;
    };
    return (
       
                <form action="" onSubmit={onSubmit}>
                    <h1 className="title"> Login into you account</h1>
                    <input type="Email" placeholder="Email" />
                    <input type="Password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered?
                        <Link to="/signup">Create an account</Link>
                    </p>
                </form>
           
    );
}

export default Login;
