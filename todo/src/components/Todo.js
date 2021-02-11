import React, { useState } from "react";
import { VscEdit } from "react-icons/vsc";
import { VscClose } from "react-icons/vsc";
import { VscCheck } from "react-icons/vsc";
import { VscTrash } from "react-icons/vsc";
import { DragSource } from "react-dnd";

function Todo({ todo, deleteTodo, handleEdit, index }) {
	const [edit, setEdit] = useState(false);
	const { id, title, body, status } = todo;
	const [currentTitle, setCurrentTitle] = useState(title);
	const [currentBody, setCurrentBody] = useState(body);
	const onClick = (e) => {
		console.log(e);
		setEdit(!edit);
	};

	const updateTodo = async () => {
		const newTodo = await fetch("http://localhost:4000/todos", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: id,
				title: currentTitle,
				body: currentBody,
				status: status,
			}),
		});
		return newTodo.json();
	};

	const onSave = async () => {
		const newTodo = await updateTodo();
		// console.log(newTodo.todo);
		handleEdit(newTodo.todo);
		setEdit(false);
		console.log(id);
		// setEdit(!edit);
	};

	// const onEdit = () => {
	// 	// deleteTodo(id);
	// 	console.log(id);
	// };

	return (
		<>
			<div>
				<div>
					<ul>
						<li className="draggable">
							<div className="doot">
								<h4>
									<span style={{ display: edit ? "none" : "inline" }}>
										{title}
									</span>{" "}
									<input
										className="todo_input"
										style={{
											display: edit ? "block" : "none",
										}}
										onChange={(e) => setCurrentTitle(e.target.value)}
										value={currentTitle}
									/>
									<input
										className="todo_input"
										style={{ display: edit ? "inline" : "none" }}
										value={currentBody}
										onChange={(e) => setCurrentBody(e.target.value)}
									/>
									{edit ? (
										<VscCheck
											className="icon"
											onClick={onSave}
											style={{ fontSize: "1.5rem", padding: "3px" }}
										/>
									) : (
										<VscEdit
											className="icon"
											onClick={onClick}
											style={{ fontSize: "1.5rem", padding: "3px" }}
										/>
									)}
									{edit ? (
										<VscClose
											className="icon"
											onClick={() => {
												setEdit(false);
												setCurrentTitle(title);
												setCurrentBody(body);
											}}
											style={{
												color: "red",
												fontSize: "1.5rem",
												padding: "3px",
											}}
										/>
									) : (
										<VscTrash
											className="icon"
											onClick={() => deleteTodo(id)}
											style={{
												color: "red",
												fontSize: "1.5rem",
												padding: "3px",
											}}
										/>
									)}
								</h4>
								<p style={{ display: edit ? "none" : "inline" }}>{body} </p>
							</div>
						</li>
					</ul>
				</div>
				{/* <div className="todo_column todo_in_progress">
					<ul>
						<li>
							<div>
								<h4>Nothing in progress</h4>
								<p></p>
							</div>
						</li>
					</ul>
				</div>
				<div className="todo_column todo_done">
					<ul>
						<li>
							<div>
								<h4>Nothing finished</h4>
								<p></p>
							</div>
						</li>
					</ul>
				</div> */}
			</div>
		</>
	);
}

export default Todo;
