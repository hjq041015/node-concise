import { readFile, appendFile } from "node:fs/promises";

const data = await readFile("./data.json", "utf8");
await appendFile("./data.json", "Hello World!", "utf-8");
console.log(data);
