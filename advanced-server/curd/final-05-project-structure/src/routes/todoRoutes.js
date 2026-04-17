import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  getTodoById,
  deleteTodoById,
} from "../controllers/todoController.js";

const router = express.Router();

router.route("/todos").get(getTodos).post(createTodo).patch(updateTodo);
router
  .route("/todos/:todoId")
  .get(getTodoById)
  .delete(deleteTodoById)
  .patch(updateTodo);

export default router;
