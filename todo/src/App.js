import "./App.css";
import Navbar from "./components/Navbar";
import React, { useEffect } from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";
import Task from "./components/Task";

// import Project from "./components/Project";
// import Userprofile from "./components/Userprofile";

import Project from "./components/ProjectManage";
import { useState } from "react";
import Userprofile from "./components/Userprofile";
import Dashboard from "./components/Dashboard";
import ProjectPage from "./components/ProjectPage";

export const CredentialsContext = React.createContext(null);
// export const ProjectsContext = React.createContext(null);

function App() {
	const credentialsState = useState(null);
	// const [projects, setProjects] = useState([]);

	var targetDate = new Date();
	targetDate.setDate(targetDate.getDate() + 10);

	const [userId, setUserId] = useState();
	const [projects, setProjects] = useState([]);
	// const projectsState = useState(null);

	useEffect(() => {
		console.log(localStorage.getItem("currentUser"));
		setUserId(localStorage.getItem("currentUser"));

		if (localStorage.getItem) {
			console.log("great success");
		}
		// const fetchProjects = async () => {
		// 	const res = await fetch("http://localhost:4000/projects", {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify({
		// 			userId,
		// 		}),
		// 	});
		// 	console.log(res);
		// 	return res;
		// };
		// fetchProjects();
		// setProjects(res.projects);
	}, []);

	const addToState = (projects, id) => {
		setProjects(projects);
		setUserId(id);
		// projects.map((project) => {
		// 	console.log(project);
		// });
	};

	const deleteTodo = async (id) => {
		// await fetch(`http://localhost:4000/todo/${id}`, {
		// 	method: "DELETE",
		// });
		// const reducedTodo = [...projects];
		// console.log(reducedTodo);
		console.log(id);
	};

	const addTodo = (todo) => {};

	return (
		<div className="App">
			<CredentialsContext.Provider
				value={credentialsState}
				// value={projectsState}
			>
				<Router>
					<Route path="/">
						<Navbar
							userId={userId}
							setUserId={setUserId}
							projects={projects}
							setProjects={setProjects}
						/>
					</Route>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/login">
							<Login addProject={addToState} />
						</Route>
						{/* <Route
							render={(props) =>
								userId ? (
									<Dashboard projects={projects} setProjects={setProjects} />
								) : (
									<Redirect
										to={{
											pathname: "/register",
										}}
									/>
								)
							}
						/> */}
						{/* <Route
							render={(props) =>
								userId ? (
									<Userprofile  />
								) : (
									<Redirect
										to={{
											pathname: "/register",
										}}
									/>
								)
							}
						/> */}
						<Route exact path="/dashboard">
							<Dashboard projects={projects} setProjects={setProjects} />
						</Route>
						<Route exact path="/userprofile">
							<Userprofile />
						</Route>
						{/* <Route exact path="/project">
							<ProjectPage />
						</Route> */}
						<Route exact path="/project/:id">
							<ProjectPage
								setProjects={setProjects}
								projects={projects}
								deleteTodo={deleteTodo}
							/>
						</Route>
						<Route exact path="/projectoverview">
							{/* <Project /> */}
							{/* <Task /> */}
						</Route>
					</Switch>
					{/* <Project /> */}
					{/* <Task /> */}
				</Router>
			</CredentialsContext.Provider>
		</div>
	);
}
export default App;
