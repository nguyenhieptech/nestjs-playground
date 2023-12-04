import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerGetMiddleware } from './middlewares/logger-get.middleware';
import { LoggerPostMiddleware } from './middlewares/logger-post.middleware';
import { LoggerPatchMiddleware } from './middlewares/logger-patch-middleware';
import { LoggerDeleteMiddleware } from './middlewares/logger-delete-middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // https://docs.nestjs.com/middleware#applying-middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerGetMiddleware).forRoutes({ path: 'cats', method: RequestMethod.GET });
    consumer.apply(LoggerPostMiddleware).forRoutes({ path: 'cats', method: RequestMethod.POST });
    consumer.apply(LoggerPatchMiddleware).forRoutes({ path: 'cats', method: RequestMethod.PATCH });
    consumer.apply(LoggerDeleteMiddleware).forRoutes({ path: 'cats', method: RequestMethod.DELETE });
  }
}
