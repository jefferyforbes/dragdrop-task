const { sequelize, DataTypes, Model } = require("./sequelize_index");
const { Project } = require("./Project");

/**
 * Represents a User for the todo list
 */
class User extends Model {
	// add methods here
}

User.init(
	{
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		avatar: DataTypes.STRING,
	},
	{
		sequelize,
		timestamps: false,
	}
);

User.hasMany(Project, { as: "projects", foreignKey: "user_id" });
Project.belongsTo(User, { foreignKey: "user_id" });

module.exports = { User };

// local testing - remove when using Jest
(async () => {
	await sequelize.sync({ force: true }); // recreate db
	const r = await User.create({
		username: "testUser",
		password: "aaaaa",
		password: "www.test.com",
	});

	console.log("Inserted user:" + r.username);
})();
