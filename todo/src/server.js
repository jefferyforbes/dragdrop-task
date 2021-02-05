const express = require("express");
const cors = require("cors");
const app = express();

// Password hashing
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const { User } = require("../database/User");

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

app.listen(port, () => {
	console.log(`Server listening on port http://localhost:${port}`);
});

function isUnique(username) {
	return User.count({ where: { username: username } }).then((count) => {
		if (count != 0) {
			return false;
		}
		return true;
	});
}
