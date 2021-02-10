import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Todo from "./Todo";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { VscEdit } from "react-icons/vsc";
import { VscClose } from "react-icons/vsc";
import { VscCheck } from "react-icons/vsc";
import Project from "./ProjectManage";

function ProjectPage({ projects, setProjects, deleteTodo }) {
	const { id } = useParams();
	let currentProject;
	const [todos, setTodos] = useState([]);
	const [add, setAdd] = useState(true);
	const [todoTitle, setTodoTitle] = useState("");
	const [todoBody, setTodoBody] = useState("");

	const history = useHistory();

	useEffect(() => {
		currentProject = projects.find(function (project) {
			return project.id == id;
		});
		console.log(currentProject);
		if (currentProject) {
			setTodos(currentProject.todos);
		}
	}, []);

	const handleDragEnd = (result) => {
		const item = currentProject.todos.find(
			(todo) => todo.name == result.draggableId
		);
		console.log(item);
	};

	const handleProjectDelete = async () => {
		await fetch(`http://localhost:4000/project/${currentProject.id}`, {
			method: "DELETE",
		}).then(() => history.push("/dashboard"));
	};

	const handleDelete = async (id) => {
		await fetch(`http://localhost:4000/todo/${id}`, {
			method: "DELETE",
		});
		const reducedTodos = [...todos];
		const newTodos = reducedTodos.filter((todo) => todo.id != id);
		setTodos(newTodos);
		deleteTodo(id);
	};

	const handleAddTodo = (event) => {
		event.preventDefault();
		fetch("http://localhost:4000/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: todoTitle,
				body: todoBody,
				projectId: id,
			}),
		}).then((res) => {
			// console.log(res.json().todo);
			setTodos([...todos, res.json().todo]);
			// window.location.reload();
		});
		// setTodos([...todos, to]);
		// window.location.reload();
		// console.log(todo.json());
		console.log(todoTitle, todoBody);
	};

	return (
		<>
			<div className="project_title_banner">
				<div className="project_header">
					<h2 className="project_title">
						{currentProject && currentProject.title}
					</h2>
					<VscClose onClick={handleProjectDelete} className="project_delete" />
				</div>
			</div>
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
											{todos.map((todo, index) => {
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
																<Todo deleteTodo={handleDelete} todo={todo} />
															</li>
														)}
													</Draggable>
												) : (
													""
												);
											})}
											<form
												onSubmit={handleAddTodo}
												style={{ display: add ? "inline" : "none" }}
											>
												<ul>
													<li>
														<div>
															<input
																value={todoTitle}
																onChange={(event) =>
																	setTodoTitle(event.target.value)
																}
																name="new_todo_title"
															/>
															<input
																onChange={(event) =>
																	setTodoBody(event.target.value)
																}
																value={todoBody}
																body="new_todo_body"
															/>
															<button type="submit">Add</button>
														</div>
													</li>
												</ul>
											</form>
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
									{todos.map((todo) => {
										return todo.status == 2 ? (
											<li>
												<Todo deleteTodo={handleDelete} todo={todo} />
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
									{todos.map((todo) => {
										return todo.status == 3 ? (
											<li>
												<Todo deleteTodo={handleDelete} todo={todo} />
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
		</>
	);
}

export default ProjectPage;
