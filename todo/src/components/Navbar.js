import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CredentialsContext } from "../App";

function Navbar() {
	const [credentials] = useContext(CredentialsContext);
	return (
		<nav>
			<ul>
				<li>{credentials ? "" : <Link to="/">HOME</Link>}</li>
				<li>
					{credentials ? <Link to="/userprofile">USER PROFILE</Link> : ""}
				</li>
				<li>{credentials ? <Link to="/dashboard">DASHBOARD</Link> : ""}</li>
				<li>
					{credentials ? (
						<Link to="/projectoverview"> PROJECT OVERVIEW</Link>
					) : (
						""
					)}
				</li>
				<li className="user">
					{credentials ? <Link to="/userprofile">USER</Link> : ""}
				</li>
				<li className="searchBar">
					<input type="text" placeholder="Search.."></input>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
