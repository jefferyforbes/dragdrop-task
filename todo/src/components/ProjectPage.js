import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Todo from "./Todo";
import { useParams } from "react-router-dom";

function ProjectPage({ projects }) {
	const { id } = useParams();
	const currentProject = projects.find(function (project) {
		return project.id == id;
	});

	return (
		<div>
			{currentProject.todos.map((todo) => (
				<Todo todo={todo} />
			))}
		</div>
	);
}

export default ProjectPage;
