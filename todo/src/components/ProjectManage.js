import React, { useState } from "react";
import ReactDom from "react-dom";
import Task from "./Task";

function Project() {
    const today = new Date();
    const [projectTitle, setProjectTitle] = useState("Project Title");
    const [projectCreated, setProjectCreated] = useState(today);
    const [projectDueDate, setDueDate] = useState(today);

    const useHandleInput = (event) => {
    event.preventDefault()
    console.log(projectTitle, projectCreated, projectDueDate)

    const newProject = <div style={{
        display: "flex",
        flexFlow: "column",
        color: "whitesmoke",
        padding: "2rem",
        margin: "2rem",
        minHeight: "5rem",
        width: "auto",
        height: "auto",
        border: "solid 8px black",
    }}>
        <p>Task: {projectTitle}</p>
        <p>Created: {projectCreated}</p>
        <p>Due Date: {projectDueDate}</p>
    </div>

    ReactDom.render(newProject, document.getElementById("testProjectArea"));

    setProjectCreated(today)

        fetch("http://localhost:4000/createProject", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				projectTitle,
                projectCreated,
                projectDueDate
			}),
		})
    }

    const projectTitleContainer={
        display: flex,
    }

return ( <div>
    <form onSubmit={useHandleInput}>
        {/* The form could be refactored using the reducer hook as it is preferable as the industry standard */}
        <div class="projectTitleContainer">
            <label for="projectTitle">Project Title: </label>
            <input type="text" name="projectTitle" required value={projectTitle} onChange={event => setProjectTitle(event.target.value)} />
        </div>
        <label for="due-date">Due Date: </label>
        <input type="date" name="due-date" required value={projectDueDate} onChange={event => setDueDate(event.target.value)} 
        min={today} max="" />

        <input type="submit" value="Submit" />
    </form>

    <div id="testProjectArea" style={{
        display: "flex",
        minWidth: "20rem",
        minHeight: "35rem",
        flexFlow: "row",
        padding: "4rem",
        margin: "4rem",
        background: "cyan",
        justifyContent: "center",
        border: "solid 0.45rem black",
        fontFamily: "poppins",
    }}>

    </div>
</div>

)}

export default Project;