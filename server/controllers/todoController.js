import Project from "../models/projectModel.js";
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
    if (!name) {
      res.status(400);
      throw new Error("bad request");
    }
    const todo = await Todo.create(data);
    await Project.findByIdAndUpdate(
      todo.project_id,
      { $addToSet: { todos: todo._id } },
      { new: true }
    );
    res.status(201).json(todo);
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
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id },
      { name, status, description },
      { new: true }
    );
    if (updatedTodo) {
      res.status(200).json({ message: "Todo Updated" });
    } else {
      res.status(404).json({ error: "Todo Not Fouond" });
    }
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
    const todo = await Todo.deleteOne({ _id: id });
    if (todo?.deletedCount === 1) {
      res.status(200).json({ message: "Todo Deleted" });
    } else {
      res.status(404).json({ error: "Todo Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

export { addTodo, updateTodo, deleteTodo };
