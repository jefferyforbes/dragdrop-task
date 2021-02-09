import React from "react";

function ProjectCard({ project }) {
	const { title, createdAt, dueAt } = project;

	const percentageTimeLeft =
		((new Date().getTime() - createdAt) / (dueAt - createdAt)) * 100;

	return (
		<div className="project">
			<div className="project_title">
				<h2>{title}</h2>
			</div>
			<div className="progress_bar">
				<h3>Progress bar here</h3>
				<p>|------------|</p>
			</div>
		</div>
	);
}

export default ProjectCard;
