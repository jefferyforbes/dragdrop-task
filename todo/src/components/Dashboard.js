import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import ProjectPage from "./ProjectPage";

function Dashboard({ projects }) {
	return (
		// <div className="project_wrap">
		<div className="project_wrapper">
			{projects.map((project) => (
				<li>
					<Link className="project_link" to={`/project/${project.id}`}>
						{/* <h1>{project.title}</h1> */}
						<div>
							<ProjectCard project={project} />
						</div>
					</Link>
				</li>
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
		// </div>
	);
}

export default Dashboard;
