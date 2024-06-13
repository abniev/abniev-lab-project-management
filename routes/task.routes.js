const router = require("express").Router();

const Task = require("../models/Task.model.js");
const Project = require("../models/Project.model.js");

router.post("/", async (req, res) => {
  try {
    const { title, status, projectId } = req.body;
    const createTask = await Task.create({ title, status, project: projectId });
    const updatedProject = await Project.findByIdAndUpdate(projectId, {
      $push: { tasks: createTask._id },
      new: true,
    });
    res.status(201).json({
      message: "Task created successfully and added to project",
      task: createTask,
      project: updatedProject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedTask = await Task.findById(taskId, req.body, { new: true });
    res.json({ message: "Task was updated successfully", task: updatedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    await Project.findByIdAndUpdate(deletedTask.project, {
      $pull: { tasks: taskId },
    });
    res.json({
      message: "Task was deleted and removed from project successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
