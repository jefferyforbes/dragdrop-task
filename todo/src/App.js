import "./App.css";
import Navbar from "./components/Navbar";
import React from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Task from "./components/Task";
import Project from "./components/Project";
import { useState } from "react";
import Userprofile from "./components/Userprofile";

export const CredentialsContext = React.createContext(null);

function App() {
	const credentialsState = useState(null);
	return (
		<div className="App">
			<CredentialsContext.Provider value={credentialsState}>
				<Router>
					<Route path="/">
						<Navbar />
					</Route>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/userprofile">
							<Userprofile />
						</Route>
					</Switch>
					{/* <Project /> */}
					{/* <Task /> */}
				</Router>
			</CredentialsContext.Provider>
		</div>
	);
}

export default App;
