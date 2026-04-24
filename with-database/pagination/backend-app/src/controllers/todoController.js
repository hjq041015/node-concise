import {
  getAllTodos,
  getTodoById as getTodoByIdApi,
  deleteTodoById as deleteTodoByIdApi,
  createTodo as createTodoApi,
  updateTodo as updateTodoApi,
  count as countApi,
} from "../services/todoService.js";
import AppError from "../utils/appError.js";
import {
  sendNotFoundResponse,
  sendSuccessResponse,
} from "../utils/responseHelper.js";

export async function getTodos(req, res) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const search = req.query.search || "";

  const offset = (page - 1) * limit;

  const todos = await getAllTodos(offset, limit, search);

  return sendSuccessResponse(res, todos);
}

export async function getTodoById(req, res) {
  const todo = await getTodoByIdApi(req.params.todoId);

  if (todo) {
    return sendSuccessResponse(res, todo);
  }

  return sendNotFoundResponse(res);
}

export async function deleteTodoById(req, res) {
  const todoId = req.params.todoId;

  if (!todoId) {
    throw new AppError(`The todoId is required`, 400, "Bad request");
  }

  const deletedTodoNumbers = await deleteTodoByIdApi(todoId);

  if (!deletedTodoNumbers) {
    return sendNotFoundResponse(res);
  }

  return sendSuccessResponse(res, deletedTodoNumbers);
}

export async function createTodo(req, res) {
  const addTodo = req.body;

  if (!addTodo) {
    throw new AppError(`The todo is required`, 400, "Bad request");
  }

  try {
    const addedTodo = await createTodoApi(addTodo);

    return sendSuccessResponse(res, addedTodo);
  } catch (error) {
    throw new AppError(`the id ${addTodo.id} already exists`, 400, error.name);
  }
}

export async function updateTodo(req, res) {
  const updateTodo = req.body;

  const updatedTodoNumbers = await updateTodoApi(updateTodo);

  if (!updatedTodoNumbers) {
    return sendNotFoundResponse(res);
  }

  return sendSuccessResponse(res, updatedTodoNumbers);
}

export async function countTodo(req, res) {
  const search = req.query.search || "";
  const count = await countApi(search);

  return sendSuccessResponse(res, count);
}
