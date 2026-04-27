import validator from "validator";
import URLRecord from "../models/urlRecord.js";
import { generateShortUrl } from "../utils/urlHelper.js";
export async function createUrlRecord(req, res) {
  const { originalUrl, urlCode } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  if (!validator.isURL(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const urlRecord = await URLRecord.findOne({ where: { originalUrl } });

  if (urlRecord) {
    return res
      .status(200)
      .json({ message: "URL already exists", data: urlRecord });
  }

  if (urlCode) {
    const urlRecord = await URLRecord.findOne({ where: { urlCode } });

    if (urlRecord) {
      return res.status(400).json({ message: "URL code already exists" });
    }

    const shortUrl = await generateShortUrl(urlCode);
    const createUrlRecord = await URLRecord.create({
      id: Date.now(),
      originalUrl,
      shortUrl,
      urlCode,
    });

    return res.status(201).json({
      message: "URL record created successfully",
      data: createUrlRecord,
    });
  }

  const shortUrl = await generateShortUrl();
  const createUrlRecord = await URLRecord.create({
    id: Date.now(),
    originalUrl,
    shortUrl,
    urlCode: shortUrl.split("/").at(-1),
  });

  return res.status(201).json({
    message: "URL record created successfully",
    data: createUrlRecord,
  });
}
