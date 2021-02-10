import React, { useState, useEffect } from "react";
import background from "./background.png";
import { Link } from "react-router-dom";
import Project from "./ProjectManage";

function Home() {
	const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser"))
	const [projectList, setProjectList] = useState([])

	// useEffect((projectArray) => {
	// 	    // const getProjectOptions = {
	// 	    // method: "POST",
	// 	    // headers: { "Content-Type": "application/json" },
	// 	    // body: JSON.stringify({currentUser})
	// 	    // };
	// 	    //fetch("http://localhost:4000/getProjects", getProjectOptions)

	// 		fetch("http://localhost:4000/getProjects")
	// 	    .then(() => {
	// 	        (Response => console.log("new" + Response))
	// 			(Response => setProjectList(Response))
	// 			(Response => projectArray)
	// 			console.log(projectList)
	// 			for (let i = 0; i , projectArray.length; i++)
	// 			{console.log(projectArray[i])}
	// 			console.log(projectList)
	// 	    }, [projectList], [currentUser])})

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
