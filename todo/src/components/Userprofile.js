import React, { useContext } from "react";
import { CredentialsContext, ProjectsContext } from "../App";

function Userprofile() {
	const [credentials] = useContext(CredentialsContext);
	// const projects = useContext(ProjectsContext);
	return (
		<div className="userProfile">
			<a href=""></a>
			<div>Welcome {credentials && credentials.username}</div>;
			{/* <div>Welcome {projects && projects[0].title}</div>; */}
			<ul className="userContainer">
				<li className="userDetails"> Name: </li>
				<li className="userDetails"> Position: Assistant Administrator</li>
				<li className="userDetails"> Earliest Task Due Date: 28/02/2020</li>
				<li className="userDetails"> Number of projects: 1 </li>
				<li className="userDetails"> Manager: Cleo Longsmith </li>
			</ul>
		</div>
	);
}

export default Userprofile;
