import express from "express";
import cors from "cors";
import todoRouter from "./routes/todoRoute.js";
import userRouter from "./routes/userRoute.js";

import { pinoHttpMiddleware } from "./utils/loggerHelper.js";
import rateLimiter from "./utils/rateLimiter.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";
import jwtVerify from "./utils/jwtVerify.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(pinoHttpMiddleware);
app.use(rateLimiter);

app.use("/v1", userRouter);

app.use(jwtVerify);

app.use("/v1", todoRouter);

app.use(globalErrorHandler);

export default app;
