import express from "express";
import cors from "cors";
import { readFile, writeFile } from "node:fs/promises";

const server = express();
const port = 3000;

server.use(cors());
// 用与处理从前端请求参数中获取值
server.use(express.json());

server.get("/products", async (_req, res) => {
  const productsData = await readFile("./data.json", "utf-8");
  const products = JSON.parse(productsData);

  return res.status(200).json(products);
});

server.post("/products", async (req, res) => {
  const productsData = await readFile("./data.json", "utf-8");
  const products = JSON.parse(productsData);

  const addProduct = req.body;
  if (!addProduct) {
    return res.status(400).json({ message: "Product not found" });
  }

  const updatedPrducts = [...products, addProduct];

  await writeFile("./data.json", JSON.stringify(updatedPrducts));

  return res.status(200).json({ message: "Product has been created" });
});

server.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
