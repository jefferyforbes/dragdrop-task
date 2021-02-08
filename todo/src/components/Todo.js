import React from "react";

function Todo({ todo }) {
	const { name, body } = todo;
	return (
		<ul>
			<li>
				<div>
					<h4>{name}</h4>
					<p>{body}</p>
				</div>
			</li>
		</ul>
	);
}

export default Todo;
