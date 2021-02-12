import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import ProjectPage from "./ProjectPage";

function Dashboard({ projects, setProjects }) {
	// const [userId, setUserId] = useState();
	const [projectTitle, setProjectTitle] = useState("");
	const [projectCreated, setProjectCreated] = useState();
	const [projectDueDate, setDueDate] = useState();
	const [add, setAdd] = useState(false);

	const newDay = new Date();
	const userId = localStorage.getItem("currentUser");
	console.log(userId);

	useEffect(async () => {
		const fetchProjects = async () => {
			const res = await fetch("http://localhost:4000/projects", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId,
				}),
			});
			// setProjects(res.projects);
			return res.json();
		};
		const result = await fetchProjects();
		setProjects(result.projects);
	}, []);

	const useHandleInput = (event) => {
		event.preventDefault();
		// const newDay = new Date();

		setProjectCreated(newDay.toISOString());

		fetch("http://localhost:4000/createProject", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				projectTitle,
				projectCreated,
				projectDueDate,
				userId,
			}),
		});
		setProjectTitle("");
		setProjectCreated();
		setDueDate();
		window.location.reload();
	};

	return (
		<div>
			<div className="project_add" style={{ display: add ? "flex" : "none" }}>
				<form id="cyFormTest" onSubmit={useHandleInput}>
					<div className="flex_outer">
						<li>
							<label for="projectTitle">Project Title: </label>
							<input
								type="text"
								name="projectTitle"
								className="project_title_input"
								required
								placeholder="Project title"
								value={projectTitle}
								onChange={(event) => setProjectTitle(event.target.value)}
							/>
						</li>

						<li>
							<label for="due-date">Due Date: </label>
							<input
								id="cyDueDateInput"
								type="date"
								className="project_due_input"
								name="due-date"
								required
								value={projectDueDate}
								onChange={(event) => setDueDate(event.target.value)}
							/>
						</li>
						<input className="project_add_btn" type="submit" value="Submit" />
					</div>
				</form>
			</div>
			<div className="project_add_btn_wrapper">
				<button onClick={() => setAdd(!add)} id="addBtnCy" className="project_add_btn">
					{add ? "Close" : "Add new project"}
				</button>
			</div>
			<div className="project_wrapper">
				{projects &&
					projects.map((project) => (
						<li>
							<Link className="project_link" to={`/project/${project.id}`}>
								{/* <h1>{project.title}</h1> */}
								<div>
									<ProjectCard project={project} />
								</div>
							</Link>
						</li>
					))}
			</div>
		</div>
	);
}

export default Dashboard;
