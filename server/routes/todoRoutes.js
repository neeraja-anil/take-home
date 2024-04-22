import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
  addTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.route("/list").get(getAllTodos);
router.route("/create").post(addTodo);
router.route("/:id").put(updateTodo).delete(deleteTodo);

export default router;
