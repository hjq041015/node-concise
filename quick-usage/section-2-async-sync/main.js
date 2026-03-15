import { readFile } from "node:fs/promises";
import { readFile as readFilesync } from "node:fs";

// promises写法 (更加先进)
const data = await readFile("./data.json", "utf8");
console.log(data);

// 回调函数写法
readFilesync("./data.json", "utf8", (error, data) => {
  if (error) {
    console.log(error.message);
  }
  console.log(data);
});
