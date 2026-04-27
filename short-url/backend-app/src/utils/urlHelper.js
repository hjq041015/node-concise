import cryptoRandomString from "crypto-random-string";
import URLRecord from "../models/urlRecord.js";

const PROJECT_URL = process.env.PROJECT_URL;
const SHORT_URL_LENGTH = Number(process.env.SHORT_URL_LENGTH);

export async function generateShortUrl(customUrlCode = "") {
  if (customUrlCode) {
    return `${PROJECT_URL}/${customUrlCode}`;
  }

  let urlCode;
  while (true) {
    urlCode = cryptoRandomString({
      length: SHORT_URL_LENGTH,
      type: "url-safe",
    });

    const urlRecord = await URLRecord.findOne({ where: { urlCode } });

    if (!urlRecord) {
      break;
    }
  }

  return `${PROJECT_URL}/${urlCode}`;
}
