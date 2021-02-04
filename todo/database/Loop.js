const { User } = require("./User");
const { sequelize, DataTypes, Model } = require("./sequelize_index");

const fs = require("fs");

async function loop() {
	fs.readFile(__dirname + "/../data/users.json", async (err, data) => {
		if (err) return console.error(err);
		const users = await JSON.parse(data);
		for (let i = 0; i < users.length; i++) {
			const { username, password, avatar } = users[i];
			await User.create({ username, password, avatar });
		}
	});
}

loop();

module.exports = loop;
