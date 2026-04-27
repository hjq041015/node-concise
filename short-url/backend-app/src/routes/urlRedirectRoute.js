import { Router } from "express";
import { getOriginalUrl } from "../controllers/urlRedirectController.js";

const urlRedirectRouter = new Router();

urlRedirectRouter.route("/:urlCode").get(getOriginalUrl);

export default urlRedirectRouter;
