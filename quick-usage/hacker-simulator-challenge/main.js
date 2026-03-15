import { readFile, writeFile } from "node:fs/promises";

// read file
const keychain = await readFile("./keychain.txt", "utf8");
const data = await readFile("./data.txt", "utf8");

// Decrypt data
// move leftside
const MoveDecryptedData = data
  .split("")
  .map((currentChar) => {
    const decryptedCharCode = currentChar.charCodeAt(0) - keychain;
    return String.fromCharCode(decryptedCharCode);
  })
  .join("");

// write file
writeFile("./decrypted-data.txt", MoveDecryptedData, "utf8");
