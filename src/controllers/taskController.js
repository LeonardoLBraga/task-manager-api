const TaskModel = require("../models/taskModel");

exports.createTask = (req, res) => {
  const task = TaskModel.createTask(req.body.title, req.body.description);
  return res.status(201).json(task);
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
  const id = parseInt(req.params.id, 10);
  const updated = TaskModel.updateTask(id, req.body);

  if (!updated) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json(updated);
};

exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deleted = TaskModel.deleteTask(id);

  if (!deleted) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(204).send();
};
