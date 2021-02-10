import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Todo from "./Todo";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { VscEdit } from "react-icons/vsc";
import { VscClose } from "react-icons/vsc";
import { VscCheck } from "react-icons/vsc";
import { VscTrash } from "react-icons/vsc";
import { VscAdd } from "react-icons/vsc";
import Project from "./ProjectManage";

function ProjectPage({ projects, setProjects, deleteTodo }) {
	const { id } = useParams();
	let currentProject = projects.find(function (project) {
		return project.id == id;
	});
	const [todos, setTodos] = useState([]);
	const [add, setAdd] = useState(false);
	const [colourblind, setColourblind] = useState(false);
	const [projectTitle, setProjectTitle] = useState("");
	const [todoTitle, setTodoTitle] = useState("");
	const [todoBody, setTodoBody] = useState("");
	const [titleEdit, setTitleEdit] = useState(false);

	const history = useHistory();

	useEffect(() => {
		console.log(projects);
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
		setProjects([...projects.filter((project) => project.id != id)]);
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

	const fetchTodo = async () => {
		const newTodo = await fetch("http://localhost:4000/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: todoTitle,
				body: todoBody,
				projectId: id,
			}),
		});
		return newTodo.json();
	};

	const fetchProject = async () => {
		const newTodo = await fetch(`http://localhost:4000/project/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: projectTitle,
			}),
		});
		return newTodo.json();
	};

	const handleAddTodo = async (event) => {
		event.preventDefault();
		// const newTodo = await fetch("http://localhost:4000/todos", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		title: todoTitle,
		// 		body: todoBody,
		// 		projectId: id,
		// 	}),
		// });
		// .then((res) => {
		// console.log(res.json().todo);
		// setTodos([...todos, res.json().todo]);
		// window.location.reload();
		// });
		// setTodos([...todos, to]);
		// window.location.reload();
		// console.log(todo.json());
		const newTodo = await fetchTodo();
		setTodos([...todos, newTodo.todo]);
		setTodoTitle("");
		setTodoBody("");
		setAdd(false);
	};

	const handleEdit = async (newTodo) => {
		const reducedTodos = todos;
		setTodos(
			reducedTodos.map((todo) => {
				if (todo.id == newTodo.id) todo = newTodo;
				return todo;
			})
		);
		// console.log(todo);
	};

	const handleProjectEdit = async () => {
		const result = await fetchProject();
		console.log(result);
		setTitleEdit(false);
	};

	return (
		<>
			<div className="project_title_banner" style={{ fontFamily: "poppins" }}>
				<div className="project_subcontainer">
					<div className="project_header">
						<h2
							onKeyDown={(e) => {
								setTitleEdit(true);
								setProjectTitle(e.target.innerHTML);
							}}
							contentEditable
							style={{
								padding: "5px",
								color: "white",
								cursor: "default",
								// textTransform: "uppercase",
							}}
							className="project_title"
						>
							{currentProject && currentProject.title}
						</h2>
						<VscCheck
							onClick={handleProjectEdit}
							className="icon project_delete"
							style={{ padding: "5px", display: titleEdit ? "inline" : "none" }}
						/>
						<VscTrash
							style={{ padding: "5px" }}
							onClick={handleProjectDelete}
							className="icon project_delete"
						/>
					</div>
					<button
						className="colourblind_btn"
						onClick={() => setColourblind(!colourblind)}
					>
						Toggle Colourblind mode
					</button>
				</div>
			</div>
			<DragDropContext onDragEnd={handleDragEnd}>
				<div style={{ fontFamily: "poppins" }} className="todo_container">
					{/* {currentProject.todos.map((todo) => (
				<Todo todo={todo} />
			))} */}
					<div className="todo_wrapper">
						<Droppable droppableId="todos">
							{(provided) => (
								<ul {...provided.droppableProps} ref={provided.innerRef}>
									<li>
										{/* <ReactSortable list={currentProject.todos} setList={setProjects}> */}
										<div
											style={{
												backgroundImage: colourblind
													? "url('https://media.gowallpaper.co.uk/media/catalog/product/h/o/holden_decor_chevron_striped_pattern_black_white_wallpaper_-_12574.jpg')"
													: "",
											}}
											className="todo_column todo_current"
										>
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
																<Todo
																	handleEdit={handleEdit}
																	deleteTodo={handleDelete}
																	todo={todo}
																/>
															</li>
														)}
													</Draggable>
												) : (
													""
												);
											})}
											<form
												className="todo_form"
												onSubmit={handleAddTodo}
												style={{ display: add ? "inline" : "none" }}
											>
												<ul>
													<li>
														<div className="add_todo_container">
															<input
																value={todoTitle}
																onChange={(event) =>
																	setTodoTitle(event.target.value)
																}
																className="todo_input"
																required
																placeholder="Todo title..."
																name="new_todo_title"
															/>
															<input
																onChange={(event) =>
																	setTodoBody(event.target.value)
																}
																className="todo_input"
																value={todoBody}
																required
																placeholder="Todo description..."
																body="new_todo_body"
															/>
															<button className="project_add_btn" type="submit">
																Add
															</button>
														</div>
													</li>
												</ul>
											</form>
											<div>
												{add ? (
													<VscClose
														className="icon"
														onClick={() => setAdd(false)}
														style={{ fontSize: "2.5rem" }}
													/>
												) : (
													<VscAdd
														className="icon"
														onClick={() => setAdd(true)}
														style={{
															fontSize: "2rem",
															marginTop: "30px",
															padding: "5px",
														}}
													/>
												)}
											</div>
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
								<div
									style={{
										backgroundImage: colourblind
											? "url('https://images.freecreatives.com/wp-content/uploads/2017/01/Monochrome-Hexagon-Pattern.jpg')"
											: "",
									}}
									className="todo_column todo_in_progress"
								>
									<h2>In progress</h2>
									{todos.map((todo) => {
										return todo.status == 2 ? (
											<li>
												<Todo
													handleEdit={handleEdit}
													deleteTodo={handleDelete}
													todo={todo}
												/>
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
								<div
									style={{
										backgroundImage: colourblind
											? "url('https://cdn2.vectorstock.com/i/1000x1000/71/36/seamless-black-white-polka-dot-pattern-vector-7737136.jpg')"
											: "",
									}}
									className="todo_column todo_done"
								>
									<h2>Done</h2>
									{todos.map((todo) => {
										return todo.status == 3 ? (
											<li>
												<Todo
													handleEdit={handleEdit}
													deleteTodo={handleDelete}
													todo={todo}
												/>
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
