import React from "react";
import background from "./background.png";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="container">
			<h1 className="welcome" alt="Welcome to Docupost"> Welcome to .docupost </h1>
			<h2 className="newUser" alt="Register as a new user">
				<Link to="/register" style={{ color: "white", textDecoration: "none" }}>
					New here? Sign up for an account
				</Link>{" "}
			</h2>
		</div>
	);
}
export default Home;
