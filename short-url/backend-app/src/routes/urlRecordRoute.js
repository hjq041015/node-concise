import { Router } from "express";
import { Sequelize } from "sequelize";
import { createUrlRecord } from "../controllers/urlRecordController.js";

const urlRecordRoute = new Router();

urlRecordRoute.route("/urlRecord").post(createUrlRecord);

export default urlRecordRoute;
