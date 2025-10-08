const TaskService = require("../src/services/taskService");
const TaskModel = require("../src/models/taskModel");

jest.mock("../src/models/taskModel");

describe("TaskService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new task", () => {
    const mockTask = { id: 1, title: "New Task", description: "test" };
    TaskModel.createTask.mockReturnValue(mockTask);

    const result = TaskService.createTask("New Task", "test");

    expect(result).toEqual(mockTask);
    expect(TaskModel.createTask).toHaveBeenCalledWith("New Task", "test");
  });

  test("should return all tasks", () => {
    const mockTasks = [{ id: 1, title: "T1" }];
    TaskModel.getAllTasks.mockReturnValue(mockTasks);

    const result = TaskService.getAllTasks();

    expect(result).toEqual(mockTasks);
    expect(TaskModel.getAllTasks).toHaveBeenCalled();
  });

  test("should return a task by ID", () => {
    const mockTask = { id: 1, title: "T1" };
    TaskModel.getTaskById.mockReturnValue(mockTask);

    const result = TaskService.getTaskById(1);

    expect(result).toEqual(mockTask);
    expect(TaskModel.getTaskById).toHaveBeenCalledWith(1);
  });

  test("should update a task", () => {
    const mockUpdatedTask = { id: 1, title: "Updated Task" };
    TaskModel.updateTask.mockReturnValue(mockUpdatedTask);

    const result = TaskService.updateTask(1, { title: "Updated Task" });

    expect(result).toEqual(mockUpdatedTask);
    expect(TaskModel.updateTask).toHaveBeenCalledWith(1, { title: "Updated Task" });
  });

  test("should delete a task", () => {
    TaskModel.deleteTask.mockReturnValue(true);

    const result = TaskService.deleteTask(1);

    expect(result).toBe(true);
    expect(TaskModel.deleteTask).toHaveBeenCalledWith(1);
  });
});
