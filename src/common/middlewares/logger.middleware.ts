import { Handler } from "express";

import { Injectable, Logger, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use: Handler = (req, _res, next) => {
    Logger.debug(`${req.method} - ${req.baseUrl}`, "RequestLogger");
    next();
  };
}
