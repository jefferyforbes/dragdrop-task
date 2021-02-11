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
		// id: {
		// 	type: DataTypes.INTEGER,
		// 	primaryKey: true,
		// 	autoIncrement: true,
		// },
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		avatar: DataTypes.STRING,
	},
	{
		sequelize,
		timestamps: false,
	}
);

// User.hasMany(Project);
User.hasMany(Project, { as: "projects", foreignKey: "user_id" });
Project.belongsTo(User, { foreignKey: "user_id" });

module.exports = { User };

// local testing - remove when using Jest
(async () => {
	await sequelize.sync({ force: true }); // recreate db
	const r = await User.create({
		username: "testUser",
		password: "aaaaaa",
		avatar: "www.test.com",
	});
	console.log("Inserted user:" + r.username);
	const b = await User.create({
		username: "Noth sds",
		password: "aaaaa",
		avatar: "www.sodas.com",
	});

	console.log("Inserted user:" + b.username);
})();
