import React, { useState } from "react";

const handleError = async (response) => {
	if (!response.ok) {
		const { error } = await response.json();
		console.log("There was an error:", error);
		throw Error(error);
	}
	return response.json();
};

export default function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isError, setIsError] = useState(false);

	const register = (e) => {
		e.preventDefault();
		fetch("http://localhost:4000/register", {
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
			.then(() => {})
			.catch((err) => {
				console.log("Caught an error", err);
				setIsError(true);
			});
	};

	const wrapperStyle = {
		display: "flex",
		alignItem: "center",
		justifyContent: "center",
		marginTop: "200px",
		width: "100%",
		height: "400px",
	};

	const containerStyle = {
		// margin: "auto",
		background: "white",
		padding: "50px",
		border: "1px solid black",
		borderRadius: "5%",
		display: "flex",
		flexDirection: "column",
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
	return (
		<div style={wrapperStyle}>
			<div style={containerStyle}>
				<h1>Register</h1>
				{isError && "An error has occurred"}
				<form onSubmit={register}>
					<input
						onChange={(e) => setUsername(e.target.value)}
						placeholder="username"
					></input>
					<br />
					<input
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						placeholder="password"
					></input>
					<br />
					<button style={buttonStyle} type="submit">
						Register
					</button>
				</form>
			</div>
			<div style={containerStyle}>Test</div>
		</div>
	);
}

// export default Register;
