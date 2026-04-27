import urlRecord from "../models/urlRecord.js";
import sequelize from "../utils/dbHelper.js";

await urlRecord.sync({ force: true });
await sequelize.close();
