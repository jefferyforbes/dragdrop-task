import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { CredentialsContext, ProjectsContext } from "../App";

export const handleError = async (response) => {
	if (!response.ok) {
		const { error } = await response.json();
		console.log("There was an error:", error);
		throw Error(error);
	}
	return response.json();
};

export default function Login({ addProject }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [, setCredentials] = useContext(CredentialsContext);
	// const [, setProjects] = useContext(ProjectsContext);

	const login = async (e) => {
		e.preventDefault();
		const data = await fetch("http://localhost:4000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})
			.then(handleError)
			.then(async (res) => {
				// console.log(res);
				const avatar = res.userAvatar;
				// addProject(res.projects, res.userId);
				setCredentials({ username, password, avatar });
				localStorage.setItem("currentUser", res.userId);
				history.push("/dashboard");
				window.location.reload();
				// return res;
			})
			.catch((err) => {
				setError(err.message);
			});
	};

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
		width: "100%",
		fontFamily: '"Helvetica Neue", Arial, sans-serif',
		cursor: "pointer",
		marginTop: "20px",
	};

	const history = useHistory();
	return (
		<div className="wrapperStyle">
			<div className="containerStyle">
				<h1>Login</h1>
				{error && <span style={{ color: "red" }}>{error}</span>}
				<form onSubmit={login}>
					<input
					id="username"

						className="login_input"
						onChange={(e) => setUsername(e.target.value)}
						placeholder="username" aria-label="Username"
					></input>
					<br />
					<input
						className="login_input"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						placeholder="password" aria-label="Password"
					></input>
					<br />
					<button className="login_button" style={buttonStyle} type="submit" aria-label="Submit">
						Login
					</button>
				</form>
				<h3 className="register_prompt">
					Don't have an account yet?{" "}
					<Link className="register_now" to="/register" aria-label="Register account">
						Register now
					</Link>
				</h3>
			</div>
			{/* <div style={containerStyle}>Test</div> */}
		</div>
	);
}

// export default Register;
