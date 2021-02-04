import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">HOME</Link>
				</li>
				<li>
					<Link to="/userprofile">USER PROFILE</Link>
				</li>
				<li>
					<Link to="/dashboard">DASHBOARD</Link>
				</li>
				<li>
					<Link to="/projectoverview"> PROJECT OVERVIEW</Link>
				</li>
				<li className="user">
					<Link to="/userprofile">USER</Link>
				</li>
				<li className="searchBar">
					<input type="text" placeholder="Search.."></input>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;


