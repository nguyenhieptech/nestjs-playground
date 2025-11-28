import { FastifyReply, FastifyRequest } from "fastify";
import { Injectable, NestMiddleware } from "@nestjs/common";

// https://docs.nestjs.com/techniques/performance#middleware
@Injectable()
export class LoggerGetMiddleware implements NestMiddleware {
  use(req: FastifyRequest["raw"], res: FastifyReply["raw"], next: () => void) {
    console.log("Fastify Middleware for GET methods...");
    next();
  }
}
