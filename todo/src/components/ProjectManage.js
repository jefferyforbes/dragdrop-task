import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";

function Project () {

    const url = "http://localhost:4000";
    const today = new Date();
    const [projectTitle, setProjectTitle] = useState("Project Title");
    const [projectCreated, setProjectCreated] = useState();
    const [projectDueDate, setDueDate] = useState();
    const [projectList, setProjectList] = useState()

// -------- Request All Projects --------

// useEffect(() => {
//     setTimeout(() => {
//         fetch("http://localhost:4000/getProjects")
//     .then(res => {
//         return res.json();
//     })
//     .then(data => {
//         console.log(data);
//         setProjectList(data)
//     })
//     }, 500);
// }, [projectList])

useEffect(() => {
    const getProjects = async () => {
		const data = await fetch("http://localhost:4000/getProjects", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		})
			.then(async (res) => {
				return res;
                setProjectList(res.body.Project)
			});
	};
    const eachProject = () => {projectList.map(eachProject)}
    getProjects()
}, [projectList])


// useEffect(() => {
//     const getProjects = async () => {
//     fetch("http://localhost:4000/getProjects")
//     .then(res =>{
//         return res.json()
//     })
//     .then(data =>{
//         console.log(data)
//         setProjectList(data)
//     } )
//     }
// }, [setProjectList]);

// console.log(projectList, project)

 // ------- Create New Project --------
    const useHandleInput = (event) => {
    event.preventDefault()
    console.log(`Title: ${projectTitle}, Created: ${projectCreated}, Due: ${projectDueDate}`)
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
    }
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
        opacity: "0.75"
    }

return ( <div>
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
    }}>
        <form onSubmit={useHandleInput} style={projectTitleContainer}>
            {/* The form could be refactored using the reducer hook as it is preferable as the industry standard */}
            <div>
                <label for="projectTitle">Project Title: </label>
                <input type="text" name="projectTitle" style={inputStyle} required value={projectTitle} onChange={event => setProjectTitle(event.target.value)} />
            </div>
            <div>
                <label for="due-date">Due Date: </label>
                <input type="date" name="due-date" style={inputStyle} required value={projectDueDate} onChange={event => setDueDate(event.target.value)}/>
            </div>
        <input type="submit" style={buttonStyle} value="Submit" />
        </form>
    </div>
    <div>
        {projectList}
    </div>

</div>
)}
export default Project;