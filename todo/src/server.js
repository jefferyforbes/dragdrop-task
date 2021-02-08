const express = require("express");
const cors = require("cors");
const app = express();

// Password hashing
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

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
			password: bcrypt.hashSync(password, salt),
		});
		res.json(newUser).status(200);
	} else {
		console.log("Already exists");
		res.status(500);
		res.json({ error: "User already exists" });
	}
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	console.log("Login success");
	const user = await User.findOne({
		where: {
			username: username,
		},
	});
	
	if (!user || user.password !== bcrypt.hashSync(password, salt)) {
		console.log("Invalid login");
		res.status(403);
		res.json({ error: "Invalid login" });
	} else {
		console.log("Loggin in");
		res.status(200);
		res.json(username);
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
	console.log(`${newProject} already exists`);
	}
});

// Request All Projects
app.get("/getProjects", async (req, res) => {
	const projects = await Project.findAll({
		include: [
			{model: Project, as: "projects",
				include: [{model: Todo, as: "todos"
					}]
				}
			],
		})
	try {
		res.render("project", {projects})
	} catch (Error) {
		console.log(Error)
	}
})

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