import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom"
import { Profile } from "./profile";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			{!store.token ?
			<div>
			<h2>Memedatabase</h2>
			<h5>Please proceed to register or login</h5>
			<Link to="/login">
				<button className="btn btn-primary">Login</button>
			</Link>
			<Link to="/signup">
				<button className="btn btn-secondary">Register</button>
			</Link>
			</div>:
			<Profile/>
			}
			
		</div>
	);
};
