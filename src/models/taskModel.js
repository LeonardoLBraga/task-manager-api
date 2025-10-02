let tasks = [];
let currentId = 1;


function createTask(title, description) {
  const newTask = {
    id: currentId++,
    title,
    description,
    completed: false,
  };
  tasks.push(newTask);
  return newTask;
}


function getAllTasks() {
  return tasks;
}


function getTaskById(id) {
  return tasks.find((t) => t.id === id);
}


function updateTask(id, data) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;

  if (data.title !== undefined) task.title = data.title;
  if (data.description !== undefined) task.description = data.description;
  if (data.completed !== undefined) task.completed = data.completed;

  return task;
}


function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}


module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
