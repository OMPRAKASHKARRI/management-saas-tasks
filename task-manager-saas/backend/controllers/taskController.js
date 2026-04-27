const Task = require("../models/task");

exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;

        const task = await Task.create({
            title,
            description,
            dueDate,
            priority,
            user_id: req.user.id
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all tasks (only user's tasks)
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { user_id: req.user.id }
        });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update task status
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const { title, description, status, dueDate, priority } = req.body;

        task.title = title ?? task.title;
        task.description = description ?? task.description;
        task.status = status ?? task.status;
        task.dueDate = dueDate ?? task.dueDate;
        task.priority = priority ?? task.priority;

        await task.save();

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete task
exports.deleteTask = async (req, res) => {
    try {
        const deleted = await Task.destroy({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        });

        if (!deleted) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};