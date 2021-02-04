import React from "react";

function addTask(){
    return ( <div>

<form action="post">
            <div id="taskTitleContainer">
                <label for="taskTitle">Task Title</label>
                <input type="text" id="taskTitle" class="titleValue"></input>
            </div>
        
            <div id="taskDescriptionContainer">
                <label for="taskDescription">Task Description</label>
                <input type="text" id="taskDescription" class="descriptionValue"></input>
            </div>
        
            <div id="taskAssignedContainer">
                <label for="taskAssigned">Assign To</label>
                <select class="selectedAssign">
                    <option value="Person1">Person1</option> 
                </select>
            </div>
        
            <div id="taskStatusContainer">
                <label for="taskStatus">Task Status</label>
                <select class="selectedStatus">
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>
        
            <div id="taskProjectContainer">
                <label for="taskProject">Project</label>
                <select class="selectedProject">
                    <option value="ProjectTemplate Value">Project Template</option>
                </select>
            </div>
        </form>

    {
    
    /* const taskTitleInput = document.querySelector("titleValue").innerHTML
    const taskDescriptionInput = document.querySelector("descriptionValue").value
    const taskAssignInput = document.querySelector("selectedAssign").value
    const taskStatusInput = document.querySelector("selectedStatus").value
    const taskProjectInput = document.querySelector("selectedProject").value

    const newTask = `<ul> 
    <li>${tasktitleInput}</li>
    <li>${taskDescriptionInput}</li>
    <li>${taskAssignInput}</li>
    <li>${taskStatusInput}</li>
    <li>${taskProjectInputInput}</li>
    </ul>`

    const position = "beforeend" */}

    </div>
    );
}

export default addTask;