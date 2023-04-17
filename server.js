const express = require("express");
const path = require("path");
const logger = require("morgan");
require('dotenv').config();
require('./config/database');

const app = express();
const port = process.env.PORT;
const usersRouter = require("./routes/usersRouter");
const recipesRouter = require("./routes/recipesRouter");


app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use("/api/users", usersRouter);
app.use("/api/recipes", recipesRouter)


app.get("/api", (req, res) => {
    res.send("Server working");
  });

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });