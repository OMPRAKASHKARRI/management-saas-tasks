const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Task = sequelize.define("Task", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.ENUM("pending", "completed"),
        defaultValue: "pending",
    },

    // ✅ ADD THESE
    dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        defaultValue: "medium",
    },
});

// Relationship 🔥
User.hasMany(Task, { foreignKey: "user_id" });
Task.belongsTo(User, { foreignKey: "user_id" });

module.exports = Task;
