const { sequelize, DataTypes, Model } = require("./sequelize_index");
const { Todo } = require("./Todo");

/**
 * Represents a User for the todo list
 */
class Project extends Model {
	// add methods here
}

Project.init(
	{
		title: DataTypes.STRING,
		createdAt: DataTypes.DATE,
		dueAt: DataTypes.DATE,
	},
	{
		sequelize,
		timestamps: false,
	}
);

Project.hasMany(Todo, { as: "todos", foreignKey: "todo_id" });
Todo.belongsTo(Project, { foreignKey: "todo_id" });

module.exports = { Project };

// local testing - remove when using Jest
(async () => {
	await sequelize.sync({ force: true }); // recreate db
	const r = await Project.create({
		title: "New project",
		createdAt: Date.now,
		dueAt: Date.now,
	});

	console.log("Inserted project:" + r.title);
})();
