import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";

function Project() {
	const url = "http://localhost:4000";
	const today = new Date();
	const [projectTitle, setProjectTitle] = useState("Project Title");
	const [projectCreated, setProjectCreated] = useState();
	const [projectDueDate, setDueDate] = useState();
	const [projectList, setProjectList] = useState(null);
	// const hostLocation = window.location.origin
	// console.log(hostLocation)

	// -------- Request All Projects --------
	// setTimeout(() => {
	//     fetch("http://localhost:4000/getProjects")
	// .then (res => {
	//     if (res.ok) {
	//         console.log("Success, got all projects")
	//         setProjectList(res.data)
	//     } else {
	//         console.log("Not Successful")
	//     }
	// })
	// console.log(projectList)
	// }, 555000);

	useEffect(() => {}, [projectList]);

	// setTimeout(() => {
	//     fetch("https://6020f3fb46f1e4001780392c.mockapi.io/getApi/users")
	// .then (res => {
	//     if (res.ok) {
	//         console.log("Success, got all projects")
	//         setProjectList(res.data)
	//     } else {
	//         console.log("Not Successful")
	//     }
	// })
	// console.log(projectList)
	// }, 3000);

	// ------- Create New Project --------
	const useHandleInput = (event) => {
		event.preventDefault();

		console.log(
			`Title: ${projectTitle}, Created: ${projectCreated}, Due: ${projectDueDate}`
		);

		const newProject = (
			<div
				style={{
					display: "flex",
					flexFlow: "column",
					color: "whitesmoke",
					padding: "2rem",
					margin: "2rem",
					minHeight: "5rem",
					width: "auto",
					height: "auto",
					border: "solid 8px black",
				}}
			>
				<p>Task: {projectTitle}</p>
				<p>Created: {projectCreated}</p>
				<p>Due Date: {projectDueDate}</p>
			</div>
		);

		ReactDom.render(newProject, document.getElementById("testProjectArea"));

		setProjectCreated(today);

		fetch("http://localhost:4000/createProject", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				projectTitle,
				projectCreated,
				projectDueDate,
			}),
		});
	};

	// Media Query required at and below 600-610px

	const buttonStyle = {
		display: "inline-block",
		margin: "0",
		padding: "0.75rem 1rem",
		border: "0",
		borderRadius: "0.617rem",
		backgroundColor: "pink",
		color: "rgba(0, 0, 0, 0.6)",
		textDecoration: "none",
		fontWeight: "700",
		fontSize: "1rem",
		lineHeight: "1.5",
		width: "70%",
		fontFamily: '"Helvetica Neue", Arial, sans-serif',
		cursor: "pointer",
		marginTop: "20px",
	};

	const projectTitleContainer = {
		marginTop: "5rem",
		fontSize: "1.8rem",
		style: "poppins",
		display: "flex",
		padding: "4rem",
		flexFlow: "column",
		minHeight: "10rem",
		minWidth: "10rem",
		maxWidth: "20rem",
		backgroundColor: "cyan",
		justifyContent: "center",
		border: "4px solid black",
		borderRadius: "12px",
	};

	const inputStyle = {
		fontSize: "1.2rem",
		marginTop: "0.6rem",
		marginBottom: "1.9rem",
		display: "flex",
		minWidth: "13rem",
		justifyContent: "center",
		alignItem: "center",
		maxWidth: "20rem",
		borderRadius: "5px",
		opacity: "0.75",
	};

	return (
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignContent: "center",
				}}
			>
				<form onSubmit={useHandleInput} style={projectTitleContainer}>
					{/* The form could be refactored using the reducer hook as it is preferable as the industry standard */}
					<div>
						<label for="projectTitle">Project Title: </label>
						<input
							type="text"
							name="projectTitle"
							style={inputStyle}
							required
							value={projectTitle}
							onChange={(event) => setProjectTitle(event.target.value)}
						/>
					</div>
					<div>
						<label for="due-date">Due Date: </label>
						<input
							type="date"
							name="due-date"
							style={inputStyle}
							required
							value={projectDueDate}
							onChange={(event) => setDueDate(event.target.value)}
						/>
					</div>
					<input type="submit" style={buttonStyle} value="Submit" />
				</form>
			</div>

			<div
				id="testProjectArea"
				style={{
					display: "flex",
					minWidth: "20rem",
					minHeight: "35rem",
					flexFlow: "row",
					borderRadius: "12px",
					padding: "4rem",
					margin: "4rem",
					background: "cyan",
					justifyContent: "center",
					border: "solid 0.3rem black",
					fontFamily: "poppins",
				}}
			></div>
		</div>
	);
}
export default Project;
