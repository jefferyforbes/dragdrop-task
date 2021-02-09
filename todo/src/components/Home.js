import React, { useState, useEffect } from "react";
import background from "./background.png";
import { Link } from "react-router-dom";

function Home() {

	return (
		<div className="container">
			<h1 className="welcome"> Welcome to SIJ - Task Manager</h1>
			<h2 className="login">
				<Link to="/login" style={{ color: "white", textDecoration: "none" }}>
					Login / User Access
				</Link>
			</h2>
			<h3 className="newUser">
				<Link to="/register" style={{ color: "white", textDecoration: "none" }}>
					New here? Sign up for an account
				</Link>{" "}
			</h3>
		</div>
	);
}
export default Home;
