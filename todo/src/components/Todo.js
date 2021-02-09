import React, { useState } from "react";
import { VscEdit } from "react-icons/vsc";
import { VscClose } from "react-icons/vsc";
import { VscCheck } from "react-icons/vsc";
import { DragSource } from "react-dnd";

function Todo({ todo }) {
	const [edit, setEdit] = useState(false);
	const { id, name, body } = todo;
	const onClick = (e) => {
		console.log(e);
		setEdit(!edit);
	};
	const onSave = (e) => {
		console.log(e);
		setEdit(!edit);
	};
	return (
		<>
			<div>
				<div>
					<ul>
						<li draggable="true" className="draggable">
							<div>
								<h4>
									<span style={{ display: edit ? "none" : "inline" }}>
										{name}
									</span>{" "}
									<input
										className="todo_input"
										style={{
											display: edit ? "block" : "none",
										}}
										value={name}
									/>
									<input
										className="todo_input"
										style={{ display: edit ? "inline" : "none" }}
										value={body}
									/>
									{edit ? (
										<VscCheck className="icon" onClick={onSave} />
									) : (
										<VscEdit className="icon" onClick={onClick} />
									)}
									<VscClose
										className="icon"
										onClick={onClick}
										style={{ color: "red" }}
									/>
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
