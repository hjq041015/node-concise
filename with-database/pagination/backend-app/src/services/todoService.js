import { Op } from "sequelize";
import Todo from "../models/todoModel.js";
import sequelize from "../utils/dbHelper.js";

export async function getAllTodos(offset, limit = 5, search) {
  let titlefilter = {};

  if (search) {
    titlefilter = {
      where: sequelize.where(sequelize.fn("LOWER", sequelize.col("title")), {
        [Op.like]: `%${search.toLowerCase()}%`,
      }),
    };
  }
  const todos = await Todo.findAll({
    offset,
    limit,
    ...titlefilter,
  });

  return todos;
}

export async function getTodoById(todoId) {
  const todo = await Todo.findOne({ where: { id: todoId } });

  return todo;
}

export async function deleteTodoById(todoId) {
  await Todo.destroy({
    where: {
      id: todoId,
    },
  });
}

export async function createTodo(addTodo) {
  const addedTodo = await Todo.create(addTodo);

  return addedTodo;
}

export async function updateTodo(updateTodo) {
  await Todo.update(updateTodo, {
    where: {
      id: updateTodo.id,
    },
  });
}

export async function count(search) {
  let titlefilter = {};

  if (search) {
    titlefilter = {
      where: sequelize.where(sequelize.fn("LOWER", sequelize.col("title")), {
        [Op.like]: `%${search.toLowerCase()}%`,
      }),
    };
  }
  const count = await Todo.count(titlefilter);

  return count;
}
