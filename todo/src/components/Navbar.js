import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { CredentialsContext } from "../App";
import M from "materialize-css";
import Login from "./Login";

function Navbar() {
	// const [credentials] = useContext(CredentialsContext);
	const credentials = localStorage.getItem("currentUser");
	const history = useHistory();

	useEffect(() => {
		M.AutoInit();
	}, []);

	const handleLogout = () => {
		console.log("Click");
		localStorage.removeItem("currentUser");
		history.push("/");
	};

	return (
		<>
			<nav className="navbar">
				<ul>
					<li>{credentials ? "" : <Link to="/">HOME</Link>}</li>
					<li>
						{credentials ? (
							<Link to="/userprofile" alt="User profile">
								USER PROFILE
							</Link>
						) : (
								""
							)}
					</li>
					<li>{credentials ? <Link to="/dashboard" alt="Dashboard">DASHBOARD</Link> : ""}</li>
					<li>
						{credentials ? (
							<Link to="/projectoverview" alt="Project overview"> PROJECT OVERVIEW</Link>
						) : (
								""
							)}
					</li>
					<li className="user">
						{credentials ? (
							<a onClick={handleLogout} href="/" alt="Log out">
								LOG OUT 
							</a>
						) : (
								""
							)}
					</li>
					<li className="user">
						{credentials ? <Link to="/userprofile" aria-label="User Profile">ACCOUNT</Link> : ""}
					</li>
					{/* <li className="searchBar">
						<input type="text" placeholder="Search.."></input>
					</li> */}
					<li className="searchBar">
						<div class="growing-search">
							<div class="input">
								<input type="text" placeholder="Search..." name="search" aria-label="Search Bar" color="black"/>
							</div>
							<div class="submit">
								<button type="submit" name="go_search" aria-label="Submit">
									<span class="fa fa-search"></span>
								</button>
							</div>
						</div>
					</li>
				</ul>
				{credentials ? "" : <div className="footer">
				<div className="footer-text">Already have an account with us? <Link to="/login" aria-label="Log into account"><button className="footer-button" id="footerbutton">
					Log in now </button> </Link>
				</div>
			</div>}
			</nav>


			{/* <a class="waves-effect waves-light btn modal-trigger" href="#modal1">
				Modal
			</a>

			<footer>
				<div id="modal1" class="modal">
					<div class="modal-content">
						<h4>Modal Header</h4>
						<p>A bunch of text</p>
						<Login />
					</div>
					<div class="modal-footer">
						<a href="#!" class="modal-close waves-effect waves-green btn-flat">
							Agree
						</a>
					</div>
				</div>
			</footer> */}
			{/* <footer>
				<div className="footer"></div>
				<div className="footer-text">
					Already have an account with us?{" "}
					<button className="footer-button" id="footerbutton">
						Log in now
					</button>
				</div>
			</footer> */}

			{/* <div className="modal-background">
				<div className="modal-box">
					<div className="close">+</div>
					<img
						src="http://static1.squarespace.com/static/575a6067b654f9b902f452f4/59e64b57cf81e064f900819a/5c8c127beb393116ec4e1c52/1552683697079/300Logo.png?format=1500w"
						className="modalimage"
						href="logo"
					></img>
					<form action="">
						<input
							type="text"
							placeholder="Username"
							className="modal-input"
						></input>
						<input
							type="text"
							placeholder="Password"
							className="modal-input"
						></input>
						<a href="" className="modal-button">
							Submit
						</a>
					</form>
				</div>
			</div> */}

			{/* <footer>
				<div className="footer">
					<div className="footer-text">
						Already have an account with us?{" "}
						<button className="footer-button" id="footerbutton">
							Log in now
						</button>
					</div>
				</div>
			</footer> */}
		</>
	);
}

// function test() {
// document.getElementById(".footerbutton").addEventListener("click"),
// 	function () {
// 		document.querySelector(".modal-box").style.display = "flex";
// 	};
// document.querySelector(".close").addEventListener("click", function () {
// 	document.querySelector(".modal-box").style.display = "none";
// });
// }
export default Navbar;
