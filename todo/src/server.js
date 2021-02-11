const express = require("express");
const cors = require("cors");
const app = express();

// Password hashing
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

// Server-side validation
const { body, validationResult } = require("express-validator");

// Parsing
var bodyParser = require("body-parser");

const { User } = require("../database/User");
const { Todo } = require("../database/Todo");
const { Project } = require("../database/Project");
const { loop } = require("../database/Loop");
// const { readdirSync } = require("fs");

const port = 4000;

app.use(cors());
app.use(express.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.post(
	"/register",
	body("password").isLength({ min: 6 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json({ error: "Password must be 6 characters long" });
		}
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
	}
);

app.post("/login", body("password").isLength({ min: 6 }), async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json({ error: "Password must be at least 6 characters long" });
	}
	const { username, password } = req.body;
	console.log("Login success");
	const user = await User.findOne({
		where: {
			username: username,
		},
	});
	const userAvatar = user.avatar;
	const userId = user.id;

	// if (!user || user.password !== bcrypt.hashSync(password, salt)) {
	if (!user || user.password !== password) {
		console.log("Invalid login");
		res.status(403);
		res.json({ error: "Invalid login" });
	} else {
		const projects = await user.getProjects({
			include: [
				{
					model: Todo,
					as: "todos",
				},
			],
		});
		console.log("Loggin in");
		res.status(200);
		res.json({ username, userId, userAvatar, projects });
	}
	// res.json(user);
});

// Create New Project HTTP Request
app.post("/createProject", async (req, res) => {
	const { projectTitle, projectCreated, projectDueDate, userId } = req.body;
	// if (projectCheck) {
	console.log(projectTitle, userId);
	const newProject = await Project.create({
		title: projectTitle,
		createdAt: projectCreated,
		dueAt: projectDueDate,
		user_id: userId,
	});
	res.json(newProject).status(200);
	// } else {
	// console.log(`${newProject} already exists`);
	// }
});

// Request All Projects
app.post("/projects", async (req, res) => {
	console.log(req.body);
	const id = req.body.userId;
	const user = await User.findByPk(id);
	const projects = await user.getProjects({
		include: [
			{
				model: Todo,
				as: "todos",
			},
		],
	});
	// const projects = await Project.findAll({
	// 	include: [
	// 		{
	// 			model: Project,
	// 			as: "projects",
	// 			include: [{ model: Todo, as: "todos" }],
	// 		},
	// 	],
	// });
	// try {
	// 	res.render("project", { projects });
	// } catch (Error) {
	// 	console.log(Error);
	// }
	res.json({ projects });
});

app.get("/project/:id", async (req, res) => {
	const project = await Project.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: Todo,
				as: "todos",
			},
		],
		nest: true,
	});
	res.json(project);
});

app.post("/todos", async (req, res) => {
	const { title, body, projectId } = req.body;
	console.log(req.body);
	const todo = await Todo.create({
		title,
		body,
		status: 1,
		todo_id: projectId,
	});
	// const id = req.body.userId;
	// const user = await User.findByPk(id);
	// const projects = await user.getProjects({
	// 	include: [
	// 		{
	// 			model: Todo,
	// 			as: "todos",
	// 		},
	// 	],
	// });
	res.json({ todo });
});

/**
 * Delete a project from DB
 */
app.delete("/project/:id", async (req, res) => {
	await Project.destroy({
		where: {
			id: req.params.id,
		},
	});
	res.status(200);
	res.json({ message: "Projected deleted succesfully" });
});

app.put("/project/:id", async (req, res) => {
	const { title } = req.body;
	let project = await Project.findByPk(req.params.id);
	project.title = title;
	project.save();
	// await Project.update({ title }, { where: req.params.id });
	console.log(project);
	res.json({ message: "Project updated succesfully" });
});

app.delete("/todo/:id", async (req, res) => {
	await Todo.destroy({
		where: {
			id: req.params.id,
		},
	});
	res.status(200);
	res.json({ message: "Todo deleted succesfully" });
});

// app.delete("/todo/:id", async (req, res) => {
// 	await Todo.destroy({
// 		where: {
// 			id: req.params.id,
// 		},
// 	});
// 	res.status(200);
// 	res.json({ message: "Todo deleted succesfully" });
// });

app.put("/todos", async (req, res) => {
	const { id, title, body, status } = req.body;
	let todo = await Todo.findByPk(id);
	todo.title = title;
	todo.body = body;
	todo.status = status;
	todo.save();
	// await Project.update({ title }, { where: req.params.id });
	console.log(todo);
	res.json({ todo });
});

// Edit Profile
// app.post("/editProfile", async(req, res) => {
// 	const {currentUser, newUserName} = req.body;
// 	let updateUser = user.findOne()
// })

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
}

// Create Project Validation
function projectCheck(projectTitle) {
	return Project.count({ where: { title: projectTitle } }).then((count) => {
		if (count != 0) {
			return false;
		}
		return true;
	});
}

// User profile

app.post("/createProject", async (req, res) => {
	const { projectTitle, projectCreated, projectDueDate } = req.body;
	if (projectCheck) {
		const newProject = await Project.create({
			title: projectTitle,
			createdAt: projectCreated,
			dueAt: projectDueDate,
		});
		res.json(newProject).status(200);
	} else {
		res.json(newProject).status(200);
		alert(`${newProject} already exists`);
		console.log(`${newProject} already exists`);
	}
});
