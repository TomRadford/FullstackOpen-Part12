const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const todosRouter = require("./routes/todos");
const statisticsRouter = require('./routes/statistics')
const { getAsync, setAsync } = require("./redis");

(async () => {
  const visitCount = parseInt(await getAsync("visit_count"));
  const addedTodos = parseInt(await getAsync("added_todos"));
  if (!visitCount) {
    await setAsync("visit_count", "1");
  }

  if (!addedTodos) {
    await setAsync("added_todos", "0");
  }

})();

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/todos", todosRouter);
app.use("/statistics", statisticsRouter)


module.exports = app;
