const { updateTaskSchema, createTaskSchema } = require("../schemas/taskSchema");
const TaskService = require("../services/taskService");

exports.createTask = (req, res) => {
  try {
    const parsed = createTaskSchema.parse(req.body);
    const task = TaskService.createTask(parsed.title, parsed.description);
    return res.status(201).json(task);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.errors });
  }
};

exports.getAllTasks = (req, res) => {
  const tasks = TaskService.getAllTasks();
  res.status(200).json(tasks);
};

exports.getTaskById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = TaskService.getTaskById(id);

  if (!task) return res.status(404).json({ error: "Task not found" });

  res.status(200).json(task);
};

exports.updateTask = (req, res) => {
  try {
    const parsed = updateTaskSchema.partial().parse(req.body);
    const id = parseInt(req.params.id, 10);
    const updated = TaskService.updateTask(id, parsed);

    if (!updated) return res.status(404).json({ error: "Task not found" });

    res.status(200).json(updated);
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }
};

exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deleted = TaskService.deleteTask(id);

  if (!deleted) return res.status(404).json({ error: "Task not found" });

  res.status(204).send();
};
