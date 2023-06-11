import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const navigate = useNavigate();
	const handleSubmit = () => {
		actions.login(email, password).then(navigate("/profile"));
	};

	return (store.token && store.token != "" && store.token != undefined) ? window.location.href = "https://3000-4geeksacade-reactflaskh-o5gt5hbtsmn.ws-eu99.gitpod.io/" :

		(<div className="text-center mt-5">
			<h1>Login</h1>
			<div>
				<input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} />
				<input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />
				<button type="submit" onClick={handleSubmit}>Login</button>
			</div>
		</div>
		);
};
