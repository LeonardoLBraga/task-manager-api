const { taskSchema } = require("../utils/validateSchema");
const TaskModel = require("../models/taskModel");


exports.createTask = (req, res) => {
  try {
    const parsed = taskSchema.parse(req.body);
    const task = TaskModel.createTask(parsed.title, parsed.description);
    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }
};


exports.getAllTasks = (req, res) => {
  const tasks = TaskModel.getAllTasks();
  res.status(200).json(tasks);
};


exports.getTaskById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = TaskModel.getTaskById(id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json(task);
};


exports.updateTask = (req, res) => {
  try {
    const data = req.body;
    // validate
    const parsed = taskSchema.partial().parse(data);

    const id = parseInt(req.params.id, 10);
    const updated = TaskModel.updateTask(id, parsed);

    if (!updated) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }
};


exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deleted = TaskModel.deleteTask(id);

  if (!deleted) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(204).send();
};
