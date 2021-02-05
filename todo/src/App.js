import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Task from "./components/Task";
import Project from "./components/Project";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Navbar />
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
				</Switch>
				<Project />
				{/* <Task /> */}
			</Router>
		</div>
	);
}

export default App;
