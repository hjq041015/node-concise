import express from "express";
import { readFile } from "node:fs/promises";

const app = express();
const port = 3000;

app.get("/:idolName", async (request, respone) => {
  const idolName = request.params.idolName;

  const idolDataText = await readFile("./data.json", "utf8");
  const idolData = JSON.parse(idolDataText);

  const resultIdol = idolData.find(
    (idol) => idol.name.toLowerCase() === idolName.toLowerCase(),
  );

  if (!resultIdol) {
    respone.status(404).send("404 Not Found");
  }

  return respone.status(200).json(resultIdol);
});

app.listen(port, () => {
  // Local ip address: 127.0.0.1
  console.log(`Example app listening on http://127.0.0.1: ${port}`);
});
