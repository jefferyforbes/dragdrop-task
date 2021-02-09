import React, { useState, useEffect } from "react";
import background from "./background.png";
import { Link } from "react-router-dom";

function Home() {

	const [projectList, setProjectList] = useState([])

	useEffect(() => {
		    const currentUser = localStorage.getItem("currentUser");
		    const getProjectOptions = {
		    method: "POST",
		    headers: { "Content-Type": "application/json" },
		    body: JSON.stringify({currentUser})
		    };
		    fetch("http://localhost:4000/getProjects", getProjectOptions)
		    .then(() => {
		        (Response => console.log(Response))
				(Response => setProjectList(Response))
				console.log(projectList)
		    }, [projectList])})

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
