const { User } = require("./User");
const { Project } = require("./Project");
const { Todo } = require("./Todo");
const { sequelize, DataTypes, Model } = require("./sequelize_index");

const fs = require("fs");

async function loop() {
	fs.readFile(__dirname + "/../data/users.json", async (err, data) => {
		if (err) return console.error(err);
		await sequelize.sync({ force: true });
		const users = await JSON.parse(data);
		for (let i = 0; i < users.length; i++) {
			const { username, password, avatar } = users[i];
			await User.create({ username, password, avatar });
		}
	});
	fs.readFile(__dirname + "/../data/projects.json", async (err, data) => {
		if (err) return console.error(err);
		await sequelize.sync({ force: true });
		const projects = await JSON.parse(data);
		for (let i = 0; i < projects.length; i++) {
			const { title, createdAt, dueAt } = projects[i];
			await Project.create({ title, createdAt, dueAt });
		}
	});
	fs.readFile(__dirname + "/../data/todos.json", async (err, data) => {
		if (err) return console.error(err);
		await sequelize.sync({ force: true });
		const todos = await JSON.parse(data);
		for (let i = 0; i < todos.length; i++) {
			const id = Math.floor(Math.random() * 50) + 1;
			const { title, body, status } = todos[i];
			await Todo.create({
				title: title,
				body: body,
				status: status,
				todo_id: id,
			});
		}
	});
}

loop();

module.exports = loop;
