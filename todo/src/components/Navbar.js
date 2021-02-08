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
					{credentials ? <Link to="/" alt="home">HOME</Link>: ""}
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

	// 		<footer>
	// 	<div className="footer"></div>
	// 		<div className="footer-text">Already have an account with us? <button className="footer-button" id="footerbutton">Log in now</button></div>
	// 		)
			
	// 		document.getElementById(".footerbutton").addEventListener("click"), function () {
	// 			document.querySelector(".modal-box").style.display = "flex"
	// 		});
	// 		document.querySelector('.close').addEventListener("click", function() {
	// 		document.querySelector('.modal-box').style.display = "none"
	// 			});

	// 		</footer>
			 
 


		  
	// 		 <div className="modal-background">
	// 		 	<div className="modal-box">
	// 		 		<div className="close">+</div>
	// 		 	<img src="http://static1.squarespace.com/static/575a6067b654f9b902f452f4/59e64b57cf81e064f900819a/5c8c127beb393116ec4e1c52/1552683697079/300Logo.png?format=1500w" className="modalimage" href="logo"></img>
	// 		 		<form action="">
	// 		 			<input type="text" placeholder="Username" className="modal-input"></input>
	// 		 			<input type="text" placeholder="Password" className="modal-input"></input>
	// 		 			<a href="" className="modal-button">Submit</a>
	// 		 		</form>		
	// 		 	</div>
	// 		 </div>
	//  ); 

	//  /</div> <footer>
	//  	<div className="footer">
	//  		<div className="footer-text">Already have an account with us? <button className="footer-button" id="footerbutton">Log in now</button></div>
			
	//  	  document.getElementById(".footerbutton").addEventListener("click"), function () {
	//  			document.querySelector(".modal-box").style.display = "flex"
	//  		});
	//  		document.querySelector('.close').addEventListener("click", function() {
	//  		document.querySelector('.modal-box').style.display = "none"
	//  			});
	 		

	//  	</div>
	//  </footer>

)
 }



export default Navbar;
