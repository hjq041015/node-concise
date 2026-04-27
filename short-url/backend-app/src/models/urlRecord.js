import { DataTypes } from "sequelize";
import sequelize from "../utils/dbHelper.js";

const urlRecord = sequelize.define(
  "urlRecord",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "url_record",
  },
);

export default urlRecord;
