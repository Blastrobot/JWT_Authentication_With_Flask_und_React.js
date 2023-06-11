import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const { actions, store } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        actions.signup(email, password).then(navigate("/profile"));
    }

    return (
        <form className="box text-center mt-5" onSubmit={handleSubmit}>
            <div className="title">
                <h1>Signup</h1>
            </div>
            <div className="box-item">
                <label htmlFor="email">Email</label>
                <input id="email" type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className="box-item">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div className="box-item">
                <button type="submit">Register</button>
            </div>

        </form>
    )
}