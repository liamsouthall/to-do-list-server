const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { getList, addToDo, deleteToDo } = require("./utils/mongo-app");

const app = express();
const port = process.env.PORT || 3004;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3003");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/data", async (req, res) => {
  const fullList = await getList();
  res.send({
    data: fullList
  });
});

app.post("/register", async (req, res) => {
  await addToDo(req.body.toDo);
  res.send("POST request sent");
});

app.post("/delete", (req, res) => {
  deleteToDo(req.body.toDo);
  res.send("POST request sent");
});

app.listen(port, () => console.log(`listing on on port ${port}!`));
