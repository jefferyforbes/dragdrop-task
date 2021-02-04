import React from "react";
import { Link } from "react-router-dom";
import addTask from "./Add"
const hello = "Hi there test updated";

function Navbar() {
	return (
		<nav>
			<ul>
				<li>
					<a href="default.asp">{hello}</a>
				</li>
				<li>
					<a href="news.asp">User Profile</a>
				</li>
				<li>
					<a href="contact.asp">Dashboard</a>
				</li>
				<li>
					<a href="about.asp">Project Overview</a>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar;
