import db from "../models/index.js";

const Todo = db.todos;

//@desc CREATE NEW TODO
//@route POST /api/todo/create
//@access private
const addTodo = async (req, res) => {
  const { name, projectId, description, status } = req.body;
  const data = {
    name,
    project_id: projectId,
    description,
    status,
  };

  try {
    const todo = await Todo.create(data);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log({ error });
  }
};

//@desc UPDATE TODO
//@route POST /api/todo/id
//@access private
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { name, status, description } = req.body;

  try {
    const [row, updatedTodo] = await Todo.update(
      { name, status, description },
      { where: { id }, returning: true }
    );
    if (updatedTodo && updatedTodo !== 0) {
      res.status(200).json({ message: "Todo Updated" });
    } else {
      res.status(500).json({ error: "Todo Not Fouond" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

//@desc GET ALL TODO
//@route POST /api/todos/list
//@access private
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc DELETE TODO
//@route POST /api/todo/id
//@access private
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.destroy({ where: { id } });
    if (todo !== 0) {
      res.status(200).json({ message: "Todo Deleted" });
    } else {
      res.status(404).json({ error: "Todo Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { addTodo, updateTodo, getAllTodos, deleteTodo };
