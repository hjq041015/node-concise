import express from "express";
import cors from "cors";
import todoRouter from "./routes/todoRoute.js";
import { rateLimit } from "express-rate-limit";
import { pinoHttpMiddleware } from "./utils/loggerHelper.js";

const app = express();
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  limit: 10, // 请求的次数
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});

app.use(cors());
app.use(express.json());
app.use(pinoHttpMiddleware);
app.use(limiter);

app.use("/v1", todoRouter);

export default app;
