import React, { useContext, useEffect, useState } from "react";
import { CredentialsContext, ProjectsContext } from "../App";
// import {} from "../../data/users.json";

// function Userprofile() {
//     return (
//         <div className="userProfile">
//             <a href=""></a>
//             <ul className="userContainer">
//                 <li className="userDetails"> Name:  </li>
//                 <li className="userDetails"> Position: Assistant Administrator</li>
//                 <li className="userDetails"> Earliest Task Due Date: 28/02/2020</li>
//                 <li className="userDetails"> Number of projects: 1 </li>
//                 <li className="userDetails"> Manager: Cleo Longsmith </li>
//             </ul>
//         </div>
//     )
// }

function Userprofile() {
    // Only acticate once the update function works
    // useEffect(async () => {
    //     await {profileInput}
    // }, [currentUser], [profileInput])

    const currentUser = localStorage.getItem("currentUser")
    const [newAvatar, setNewAvatar] = useState()
    const [newUsername, setNewUsername] = useState()

    // No table in the database for the variables below
    // const [setNewEmail] = useState()
    // const [setNew] = useState()

    const profileInput = (event) => {
        event.preventDefault();
        fetch("http://localhost:4000/editprofile", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				newAvatar,
                newUsername
			})
            .then(console.log(Response.JSON()))
		});
        console.log(`current Username: ${currentUser}, New Avatar: ${newAvatar}, New Username: ${newUsername}`)
    }

    return (
        <form onSubmit={profileInput}>
            <div className="box">
                <img src="https://www.w3schools.com/w3images/avatar2.png" className="img" href="Office Avatar"></img>
                <label className="button" for="file">Edit Avatar</label>
                <input className="button" type="file" name="Avatar" id="file" value={newAvatar} onChange={event => setNewAvatar(event.target.value)} accept="image"></input>
                <input className="button" type="text" name="Username" required value={newUsername} onChange={event => setNewUsername(event.target.value)} placeholder="Username"></input>
                {/* {{this.username}} */}
                <input className="button" type="email" name="" placeholder="Email ID"></input>
                <input className="button" type="text" name="" placeholder="Managed by:"></input>
                <input className="button" type="text" name="" placeholder="Gender"></input>
                <button className="button1"> Save changes </button>
                <button className="button1"> Cancel changes </button>
            </div>
        </form>
    )

    // const [credentials] = useContext(CredentialsContext);
	// return (
	// 	<div className="userProfile">
	// 		<a href=""></a>
	// 		<div>Welcome {credentials && credentials.username}</div>; 
}

export default Userprofile;
