import { createLogger, format, transports } from "winston";
import dotenv from "dotenv";

dotenv.config();

const { combine, timestamp, printf, colorize, errors } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const env = process.env.NODE_ENV || "development";

// Winston logger
const logger = createLogger({
  level: env === "development" ? "debug" : "warn",
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console({
      silent: env !== "development",
    }),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

export default logger;
