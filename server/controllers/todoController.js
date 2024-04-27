import Todo from "../models/todoModel.js";

//@desc CREATE NEW TODO
//@route POST /api/todo/create
//@access private
const addTodo = async (req, res, next) => {
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
    next(error);
  }
};

//@desc UPDATE TODO
//@route POST /api/todo/id
//@access private
const updateTodo = async (req, res, next) => {
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
    next(error);
  }
};

//@desc GET ALL TODO
//@route POST /api/todos/list
//@access private
const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

//@desc DELETE TODO
//@route POST /api/todo/id
//@access private
const deleteTodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await Todo.destroy({ where: { id } });
    if (todo !== 0) {
      res.status(200).json({ message: "Todo Deleted" });
    } else {
      res.status(404).json({ error: "Todo Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

export { addTodo, updateTodo, getAllTodos, deleteTodo };
