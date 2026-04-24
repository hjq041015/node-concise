import pino from "pino";
import pinoHttp from "pino-http";

export const logger = pino(
  pino.transport({
    targets: [
      {
        target: "pino/file",
        level: "info",
        options: {
          destination: "./src/logs/all-logs.log",
          mkdir: true,
        },
      },
      {
        target: "pino/file",
        level: "error",
        options: {
          destination: "./src/logs/error.log",
          mkdir: true,
        },
      },
      {
        target: "pino-pretty",
        level: "info",
        options: {
          colorize: true,
        },
      },
    ],
  }),
);

export const pinoHttpMiddleware = pinoHttp({
  logger,
  customLogLevel: function (_req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500 || err) {
      return "error";
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return "silent";
    }
    return "info";
  },
});
