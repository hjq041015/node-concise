import { readFile } from "fs/promises";
import sequelize from "../utils/dbHelper.js";
import Todo from "../models/toDoModel.js";

try {
  const initializeTodosString = await readFile(
    "./src/scripts/data/initData.json",
    "utf-8",
  );

  const initilizeTodos = JSON.parse(initializeTodosString);

  await sequelize.authenticate();

  await sequelize.sync({ force: true });

  const todos = await Todo.bulkCreate(initilizeTodos);
  console(JSON.stringify(todos, null, 2));
} catch (error) {
  console.log(error.message);
} finally {
  sequelize.close();
}
