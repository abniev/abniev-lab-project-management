const router = require("express").Router();

const Project = require("../models/Project.model.js");
const Task = require("../models/Task.model.js");

router.post("/", async (req, res) => {
  try {
    const { title, description, tasks } = req.body;
    const createProject = await Project.create({ title, description, tasks });
    res.status(201).json(createProject);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allProjects = await Project.find();
    res.status(200).json(allProjects);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const singleProject = await Project.findById(projectId).populate("tasks");
    res.json(singleProject);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const editedProject = await Project.findByIdAndUpdate(projectId, req.body, {
      new: true,
    });
    res.json(editedProject);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const deletedProject = await Project.findByIdAndDelete(projectId);
    await deletedProject.tasks.forEach(async (task) => {
      await Task.findByIdAndDelete(task);
    });

    res.json({
      message: "Project and associated Tasks was deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
