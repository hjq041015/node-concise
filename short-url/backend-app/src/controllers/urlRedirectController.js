import urlRecord from "../models/urlRecord.js";

export async function getOriginalUrl(req, res) {
  const { urlCode } = req.params;

  const urlRecords = await urlRecord.findOne({ where: { urlCode } });

  if (!urlRecords) {
    return res.status(404).json({ error: "URL not found" });
  }

  return res
    .status(200)
    .json({ message: "Success", data: urlRecords.originalUrl });
}
