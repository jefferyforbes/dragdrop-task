import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProjectPage from "./ProjectPage";

function Dashboard({ projects }) {
	return (
		<div>
			{projects.map((project) => (
				<Link to={`/project/${project.id}`}>
					<h1>{project.title}</h1>
				</Link>
				// <div>
				// 	{project.todos.map((todo) => (
				// 		<Todo todo={todo} />
				// 	))}
				// </div>
				// <Link to={`/project`}>
				// 	<ProjectPage project={project} />
				// </Link>
			))}
		</div>
	);
}

export default Dashboard;
