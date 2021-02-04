import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/userprofile">User Profile</Link>
				</li>
				<li>
					<Link to="/dashboard">Dashboard</Link>
				</li>
				<li>
					<Link to="/projectoverview"> Project Overview</Link>
				</li>
				<li className="user">
					<Link to="/userprofile">User</Link>
				</li>
				<li className="searchBar">
					<input type="text" placeholder="Search.."></input>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;


