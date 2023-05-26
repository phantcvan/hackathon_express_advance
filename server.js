const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const taskRoutes = require("./routes/task.routes");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true, }));

server.use(morgan("dev"));
server.use(cors());

server.use("/api/v1/tasks", taskRoutes);

server.listen(8000, () => {
  console.log("http://localhost:8000");
});
