import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Task from "./components/Task";
import Project from "./components/Project";
import Userprofile from "./components/Userprofile";

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
						<Task />
					</Route>
					<Route exact path="/Userprofile">
						<Userprofile />
					</Route>
				</Switch>
				{/* <Project /> */}
				{/* <Task /> */}
			</Router>
		</div>
	);
}

export default App;
