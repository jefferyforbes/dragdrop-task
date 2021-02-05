const express = require("express");
const cors = require("cors");
const app = express();

const { User } = require("../database/User");
const { Todo } = require("../database/Todo");
const { Project } = require("../database/Project");

const port = 4000;

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
	const { username, password } = req.body;
	const unique = await isUnique(username);
	if (unique) {
		console.log("Making new");
		const newUser = await User.create({
			username: username,
			password: password,
		});
		res.json(newUser).status(200);
	} else {
		console.log("Already exists");
		res.status(500);
		res.json({ error: "User already exists" });
	}

	// res.json(user);
});

// Create New Project HTTP Request
app.post("/createProject", async (req, res) => {
	const { projectTitle, projectCreated, projectDueDate } = req.body;
	if (projectCheck) {
		const newProject = await Project.create({
			title: projectTitle,
			createdAt: projectCreated,
			dueAt: projectDueDate
		});
		res.json(newProject).status(200);
	} else {
	res.json(newProject).status(200);
	alert(`${newProject} already exists`)
	console.log("Already exists");
	res.status(500);
	res.json({ error: "User already exists" });
	}
});

app.listen(port, () => {
	console.log(`Server listening on port http://localhost:${port}`);
});

// Register (User Create) Validation
function isUnique(username) {
	return User.count({ where: { username: username } }).then((count) => {
		if (count != 0) {
			return false;
		}
		return true;
	});
};

// Create Project Validation
function projectCheck(projectTitle) {
	return Project.count({ where: { title: projectTitle } }).then((count) => {
		if (count != 0) {
			return false;
		}
		return true;
	});
}