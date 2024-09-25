import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ThrottlerModule } from "@nestjs/throttler";

import { multerConfig, serveStaticConfig, throtthlerConfig } from "@/config";
import { AuthMiddleware, LoggerMiddleware } from "@/middlewares";
import { PrismaModule } from "@/prisma";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// Routes
import * as Routes from "@/routes";
const routes = Object.values(Routes);

@Module({
  controllers: [AppController],
  imports: [
    ...routes,
    PrismaModule,
    ThrottlerModule.forRoot(throtthlerConfig),
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
