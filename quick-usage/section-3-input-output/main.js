import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const readline = createInterface({
  input: stdin,
  output: stdout,
});

const name = await readline.question("what's your name\n");

console.log(`Welcome ${name}`);

readline.close;
