const express = require("express");
const { Todo } = require("../mongo");
const TodoModel = require("../mongo/models/Todo");
const { getAsync, setAsync } = require("../redis");
const router = express.Router();

(async () => {
  if (!getAsync('added_todos')) {

  }
})()

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  res.send(todo);
  const addedTodos = parseInt(await getAsync('added_todos'))
  await setAsync('added_todos',(addedTodos + 1).toString())
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    req.todo = await Todo.findById(id);
    if (!req.todo) return res.sendStatus(404);
    next();
  } catch (e) {
    if (e.message) {
      return res.status(500).send(e.message);
    } else {
      return res.sendStatus(400);
    }
  }
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  return res.send(req?.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const updatedNote = await TodoModel.findByIdAndUpdate(req.todo.id, req.body, {
    new: true,
  });
  return res.send(updatedNote);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
