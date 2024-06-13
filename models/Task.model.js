const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true, unique: true },
  status: { type: String, enum: ["to do", "in progress", "done"] },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
