import express from "express";
import urlRecordRouter from "./routes/urlRecordRoute.js";
import cors from "cors";
import urlRedirectRoute from "./routes/urlRedirectRoute.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };
import rateLimiter from "./utils/ratelimiter.js";
import { pinoHttpMiddleware } from "./utils/loggerHelper.js";

const app = express();

// TODO: Auth

app.use(express.json());
app.use(cors());

app.use(rateLimiter);
app.use(pinoHttpMiddleware);

app.use("/v1", urlRecordRouter);
app.use("/v1", urlRedirectRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// TODO: Global error handler

export default app;
