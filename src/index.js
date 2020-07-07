const express = require("express");
const bodyparser = require("body-parser");
const teacherRouter = require("./routes/teacherRouter");

const app = express();

app.use(bodyparser.json());

app.use("/teacher", teacherRouter);

app.get("*", (req, res) => {
  res.status(404).send("<h1> Page Not Found </h1>");
});

app.listen(8080, (req, res) => {
  console.log("Server is up and running!!");
});
