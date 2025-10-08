const TaskModel = require("../models/taskModel");

exports.createTask = (title, description) => {
  return TaskModel.createTask(title, description);
};

exports.getAllTasks = () => {
  return TaskModel.getAllTasks();
};

exports.getTaskById = (id) => {
  return TaskModel.getTaskById(id);
};

exports.updateTask = (id, data) => {
  return TaskModel.updateTask(id, data);
};

exports.deleteTask = (id) => {
  return TaskModel.deleteTask(id);
};
