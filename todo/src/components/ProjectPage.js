import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Todo from "./Todo";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function ProjectPage({ projects, setProjects }) {
	const { id } = useParams();
	const currentProject = projects.find(function (project) {
		return project.id == id;
	});
	const handleDragEnd = (result) => {
		console.log(result);
		// projects.map((project) => console.log(project.todos));
		// console.log(projects);
		const item = currentProject.todos.find(
			(todo) => todo.name == result.draggableId
		);
		console.log(item);
	};
	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className="todo_container">
				{/* {currentProject.todos.map((todo) => (
				<Todo todo={todo} />
			))} */}
				<div className="todo_wrapper">
					<Droppable droppableId="todos">
						{(provided) => (
							<ul {...provided.droppableProps} ref={provided.innerRef}>
								<li>
									{/* <ReactSortable list={currentProject.todos} setList={setProjects}> */}
									<div className="todo_column todo_current">
										<h2>Todo</h2>
										{currentProject.todos.map((todo, index) => {
											return todo.status == 1 ? (
												<Draggable
													key={todo.id}
													draggableId={todo.name}
													index={index}
												>
													{(provided) => (
														<li
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
														>
															<Todo todo={todo} />
														</li>
													)}
												</Draggable>
											) : (
												""
											);
										})}
									</div>
								</li>
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
				</div>
				<div>
					<ul>
						<li>
							<div className="todo_column todo_in_progress">
								<h2>In progress</h2>
								{currentProject.todos.map((todo) => {
									return todo.status == 2 ? (
										<li>
											<Todo todo={todo} />
										</li>
									) : (
										""
									);
								})}
							</div>
						</li>
					</ul>
				</div>
				<div>
					<ul>
						<li>
							<div className="todo_column todo_done">
								<h2>Done</h2>
								{currentProject.todos.map((todo) => {
									return todo.status == 3 ? (
										<li>
											<Todo todo={todo} />
										</li>
									) : (
										""
									);
								})}
							</div>
						</li>
					</ul>
				</div>
			</div>
		</DragDropContext>
	);
}

export default ProjectPage;
