const express = require("express");
const logger = require("morgan");
require("dotenv").config();
const connectDb = require("./config/mongoose.config.js");
const projectRouter = require("./routes/project.routes.js");
const taskRouter = require("./routes/task.routes.js");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);

connectDb();
app.listen(process.env.PORT, () => {
  console.log("Server up and running on port: " + process.env.PORT);
});
