import "./App.css";
import Navbar from "./components/Navbar";
import React, { useEffect } from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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

	const [projects, setProjects] = useState([
		{
			id: 1,
			title: "Project 1",
			createdAt: Date.now(),
			dueAt: Date.now() + 300,
			user_id: 1,
			todos: [
				{
					id: 1,
					name: "Eat bed",
					body: "Make bed",
					status: 1,
					todo_id: 1,
				},
				{
					id: 2,
					name: "Crrack vkas bed",
					body: "Eat a psa",
					status: 2,
					todo_id: 1,
				},
				{
					id: 3,
					name: "Erema alsa",
					body: "creme fraiche",
					status: 1,
					todo_id: 1,
				},
				{
					id: 2,
					name: "Crrack vkas bed",
					body: "Eat a psa",
					status: 3,
					todo_id: 1,
				},
				{
					id: 3,
					name: "Erema alsa",
					body: "creme fraiche",
					status: 3,
					todo_id: 1,
				},
			],
		},
		{
			id: 2,
			title: "Project 2",
			user_id: 1,
			todos: [
				{
					id: 1,
					name: "boss baby bed",
					body: "buy the bed",
					status: 1,
					todo_id: 2,
				},
				{
					id: 2,
					name: "bosow real",
					body: "les a psa",
					status: 2,
					todo_id: 2,
				},
				{
					id: 3,
					name: "lopa bopa",
					body: "cka fraiche",
					status: 1,
					todo_id: 2,
				},
			],
		},
		{
			id: 3,
			title: "Project 3",
			user_id: 1,
			todos: [
				{
					id: 1,
					name: "Eat bed",
					body: "Make bed",
					status: 1,
					todo_id: 3,
				},
				{
					id: 2,
					name: "Crrack vkas bed",
					body: "Eat a psa",
					status: 2,
					todo_id: 3,
				},
				{
					id: 3,
					name: "Erema alsa",
					body: "creme fraiche",
					status: 1,
					todo_id: 3,
				},
				{
					id: 2,
					name: "Crrack vkas bed",
					body: "Eat a psa",
					status: 3,
					todo_id: 3,
				},
				{
					id: 3,
					name: "Erema alsa",
					body: "creme fraiche",
					status: 3,
					todo_id: 3,
				},
			],
		},
		{
			id: 4,
			title: "Project 4",
			user_id: 1,
			todos: [
				{
					id: 1,
					name: "boss baby bed",
					body: "buy the bed",
					status: 1,
					todo_id: 4,
				},
				{
					id: 2,
					name: "bosow real",
					body: "les a psa",
					status: 2,
					todo_id: 4,
				},
				{
					id: 3,
					name: "lopa bopa",
					body: "cka fraiche",
					status: 1,
					todo_id: 4,
				},
			],
		},
	]);
	// const projectsState = useState(null);

	useEffect(() => {
		const fetchProjects = async () => {
			const res = await fetch("http://localhost:4000/");
		};
	});

	const addToState = (projects) => {
		setProjects(projects);
		// projects.map((project) => {
		// 	console.log(project);
		// });
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
							<ProjectPage setProjects={setProjects} projects={projects} />
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
