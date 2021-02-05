import React, { useState } from "react";
import ReactDom from "react-dom";


// const { sequelize, DataTypes, Model } = require("/Programming/WhiteHat BootCamp/Multiverse SWE Apprenticeship/BootCamp/dragndrop-task/dragdrop-task/todo/database/sequelize_index");
// const Todo = require("/Programming/WhiteHat BootCamp/Multiverse SWE Apprenticeship/BootCamp/dragndrop-task/dragdrop-task/todo/database/Todo")


function Task() {
    const [taskTitle, setTaskTitle] = useState("title task");
    const [taskDescription, setTaskDescription] = useState(taskTitle);
    const [taskAssigned, setTaskAssigned] = useState("Unassigned");
    const [taskStatus, setTaskStatus] = useState("To Do");
    const [taskProject, setTaskProject] = useState("No Project")

    const useHandleInput = (event) => {
        event.preventDefault()
        console.log(taskTitle, taskDescription, taskAssigned, taskStatus, taskProject)

        const newTaskCard = <div style={{
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
 
            <p>Task: {taskTitle}</p>
            <p>Description: {taskDescription}</p>
            <p>Assigned: {taskAssigned}</p>
            <p>Status: {taskStatus}</p>
            <p>Project: {taskProject}</p>
        </div>

        ReactDom.render(newTaskCard, document.getElementById("testProjectArea"));
    }

    return (<div>
        <form onSubmit={useHandleInput}>
            {/* The form could be refactored using the reducer hook as it is preferable as the industry standard */}
            <div id="taskTitleContainer">
                <label for="taskTitle">Task Title</label>
                <input type="text" name="titleI" required value={taskTitle} onChange={event => setTaskTitle(event.target.value)} />
            </div>

            <div id="taskDescriptionContainer">
                <label for="taskDesc">Task Description</label>
                <input type="text" id="taskDesc" name="taskDesc" value={taskDescription} onChange={event => setTaskDescription(event.target.value)} />
            </div>

            <div id="taskAssignedContainer">
                <label for="taskAssigned">Assign To</label>
                <select defaultValue="assignee" onChange={event => setTaskAssigned(event.target.value)}>
                    <option value="unassigned">Unassigned</option>
                    <option value="Person1">Person 1</option>
                </select>
            </div>

            <div id="taskStatusContainer">
                <label for="taskStatus">Task Status</label>
                <select value={taskStatus} onChange={event => setTaskStatus(event.target.value)}>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            <div id="taskProjectContainer">
                <label for="task-Project">Project</label>
                <select name="task-Project" value={taskProject} onChange={event => setTaskProject(event.target.value)}>
                    <option value="None">None</option>
                    <option value="Project 1">Project 1</option>
                </select>
            </div>
            <input type="submit" value="Submit" />
        </form>

        <div id="testProjectArea" style={{
            display: "flex",
            minWidth: "30rem",
            minHeight: "35rem",
            flexFlow: "row",
            padding: "4rem",
            margin: "4rem",
            background: "grey",
            justifyContent: "center",
            border: "solid 8px black",
            fontFamily: "poppins",
        }}>

        </div>
    </div>
    );
}

// -------------------EDIT SECTION-----------------------




// ---------- DataBase Section ----------

// *****Require the database folder to be moved into the src folder for access******

// (async () => {
// 	await sequelize.sync({ force: true }); // recreate db
// 	    const nTask = await Todo.create({
//             id: id.length + 1,
// 		    title: taskTitle,
// 		    body: newTaskCard,
// 		    status: 5,
//         });

// 	console.log("Inserted todo:" + nTask.title);
//     });


export default Task;