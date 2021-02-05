import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Task from "./components/Task";
import Project from "./components/ProjectManage";

function App() {
	return (
		<div className="App">
			<Router>
				<Route path='/'>
					<Navbar />
				</Route>
				<Switch>
					<Route exact path="/">
						{/* <Navbar /> */}
						<Home />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<Route exact path="/projectoverview">
						<Project />
							{/* <Task /> */}
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
