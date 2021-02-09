const express = require("express");
const cors = require("cors");
const app = express();

// Password hashing
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

// Server-side validation
const { body, validationResult } = require("express-validator");

const { User } = require("../database/User");
const { Todo } = require("../database/Todo");
const { Project } = require("../database/Project");
const { loop } = require("../database/Loop");
const { readdirSync } = require("fs");

const port = 4000;

app.use(cors());
app.use(express.json());

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
			.json({ error: "Password must be 6 characters long" });
	}
	const { username, password } = req.body;
	console.log("Login success");
	const user = await User.findOne({
		where: {
			username: username,
		},
	});

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
		res.json({ username, projects });
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
			dueAt: projectDueDate,
		});
		res.json(newProject).status(200);
	} else {
		res.json(newProject).status(200);
		alert(`${newProject} already exists`);
		console.log(`${newProject} already exists`);
	}
});

// Request All Projects
app.get("/getProjects", async (req, res) => {
	const {currentUser} = req.body
	// const currentUser = "testUser"

	// const user = await User.findByPk(1)
	// const user = await User.findOne({
	// 	where: {username: currentUser}
	// 	})



		// await Board.findOne({
        //     where:{
        //         id : boardId
        //     },
        //     include: [
        //         {model: Area, as: "areas",
        //         include:[
        //             {model: Task, as: "tasks"}
        //         ]}
        //     ]
        // })


	await User.findOne({
		where: {user_id: currentUser},
		include: [
			{model: Project, as: "projects",
				include: [{ model: Todo, as: "todos" }],
			},
		],
	});
	console.log("***" + res)
	res.json()
	console.log(res)
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
