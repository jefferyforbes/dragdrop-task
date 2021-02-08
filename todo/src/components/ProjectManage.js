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

    }
}
export default Project;
