import Task from "../models/TaskModel.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  res.json(tasks);
};

export const addTask = async (req, res) => {
  const { text, priority, dueDate } = req.body;
  const task = await Task.create({
    userId: req.user._id,
    text,
    priority,
    dueDate,
  });
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.userId.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.userId.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  await task.remove();
  res.json({ message: "Task removed" });
};
