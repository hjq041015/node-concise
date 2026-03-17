import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const server = createServer(async (req, res) => {
  // Response plain
  // response.writeHead(200, { 'Content-Type': 'text/plain' });
  // response.end('Hello World!\n');

  // Response json
  if (req.url === "/data") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const jsonFile = await readFile("./data.json", "utf8");

    res.end(jsonFile);
  }

  // Response html
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const htmlFile = await readFile("./index.html", "utf8");
    res.end(htmlFile);
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
