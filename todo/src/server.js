const express = require("express");
const cors = require("cors");
const app = express();

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
