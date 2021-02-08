const { sequelize, DataTypes, Model } = require("./sequelize_index");

/**
 * Represents a Todo for the todo list
 */
class Todo extends Model {
	// add methods here
}

Todo.init(
	{
		title: DataTypes.STRING,
		body: DataTypes.STRING,
		status: DataTypes.NUMBER,
	},
	{
		sequelize,
		timestamps: false,
	}
);

module.exports = { Todo };

// local testing - remove when using Jest
// (async () => {
// 	await sequelize.sync({ force: true }); // recreate db
// 	const r = await Todo.create({
// 		title: "todoOne",
// 		body: "aaaaa",
// 		status: 5,
// 		todo_id: 1,
// 	});

// 	console.log("Inserted todo:" + r.title);
// })();
