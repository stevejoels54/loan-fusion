import { Request, Response, NextFunction } from "express";
import logger from "../logger";

// Log all incoming requests and responses
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { method, url, body } = req;
  const startTime = Date.now();

  logger.info(`[${method}] ${url} - Request: ${JSON.stringify(body)}`);

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    logger.info(
      `[${method}] ${url} - Status: ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};

// Handle any uncaught errors in the app
export const errorLogger = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(`Error in [${req.method}] ${req.url}: ${error.message}`);
  res.status(500).json({ error: "An unexpected error occurred" });
};
