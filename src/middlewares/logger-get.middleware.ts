import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

// https://docs.nestjs.com/techniques/performance#middleware
@Injectable()
export class LoggerGetMiddleware implements NestMiddleware {
  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    console.log('Fastify Middleware for GET methods...');
    console.log('FastifyRequest', req);
    console.log('FastifyReply', res);
    next();
  }
}
