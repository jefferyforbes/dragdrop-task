import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { CredentialsContext } from "../App";

import { handleError } from "./Login";

export default function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [, setCredentials] = useContext(CredentialsContext);

	const register = async (e) => {
		e.preventDefault();
		const data = await fetch("http://localhost:4000/register", {
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
			.then((res) => {
				setCredentials({ username, password });
				localStorage.setItem("currentUser", res.id);
				history.push("/dashboard");
				window.location.reload();
			})
			.catch((err) => {
				setError(err.message);
			});
		console.log(data);
	};

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setError("");
	// 	}, 3000);
	// }, [error]);

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
				<h1>Register</h1>
				{error && <span style={{ color: "red" }}>{error}</span>}
				<form onSubmit={register}>
					<input
					id="cyRegisterUsernameInput"
						className="register_input"
						onChange={(e) => setUsername(e.target.value)}
						placeholder="username"
						required
						minLength="4"
					></input>
					<br />
					<input
					id="cyRegisterPasswordInput"
						className="register_input"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						placeholder="password"
						required
						// minLength="6"
					></input>
					<br />
					<button className="register_button" style={buttonStyle} type="submit">
						Register
					</button>
				</form>
			</div>
		</div>
	);
}

// export default Register;
