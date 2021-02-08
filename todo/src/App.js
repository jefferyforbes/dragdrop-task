import "./App.css";
import Navbar from "./components/Navbar";
import React, { useEffect } from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Task from "./components/Task";
// import Project from "./components/ProjectManage";
import { useState } from "react";
import Userprofile from "./components/Userprofile";
import Dashboard from "./components/Dashboard";
import Project from "./components/Project";

export const CredentialsContext = React.createContext(null);
// export const ProjectsContext = React.createContext(null);

function App() {
	const credentialsState = useState(null);
	const [projects, setProjects] = useState([]);
	// const projectsState = useState(null);

	// useEffect(() => {
	// 	const fetchProjects = async () => {
	// 		const res = await fetch('http://localhost:4000/')
	// 	}
	// })

	const addToState = (projects) => {
		setProjects(projects);
		// projects.map((project) => {
		// 	console.log(project);
		// });
	};

	return (
		<div className="App">
			<CredentialsContext.Provider
				value={credentialsState}
				// value={projectsState}
			>
				<Router>
					<Route path="/">
						<Navbar />
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
						<Route exact path="/dashboard">
							<Dashboard projects={projects} />
						</Route>
						<Route exact path="/userprofile">
							<Userprofile />
						</Route>
						{/* <Route exact path="/project">
							<ProjectPage />
						</Route> */}
						<Route exact path="/project/:id">
							<Project projects={projects} />
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
