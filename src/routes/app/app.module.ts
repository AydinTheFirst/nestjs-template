import { MailerModule } from "@nestjs-modules/mailer";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ThrottlerModule } from "@nestjs/throttler";

import { AuthMiddleware, LoggerMiddleware } from "@/common/middlewares";
import {
  mailerConfig,
  multerConfig,
  serveStaticConfig,
  throttlerConfig,
} from "@/config";
import { PrismaModule } from "@/prisma";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// Routes
import * as Routes from "@/routes";
import { WebsocketModule } from "@/websocket";

@Module({
  controllers: [AppController],
  imports: [
    ...Object.values(Routes),
    PrismaModule,
    WebsocketModule,
    MailerModule.forRoot(mailerConfig),
    ThrottlerModule.forRoot(throttlerConfig),
    ServeStaticModule.forRoot(serveStaticConfig),
    MulterModule.register(multerConfig),
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, AuthMiddleware).forRoutes("*");
  }
}
