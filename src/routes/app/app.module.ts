import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ThrottlerModule } from "@nestjs/throttler";
import { LoggerMiddleware, AuthMiddleware } from "@/middlewares";
import { MulterModule } from "@nestjs/platform-express";
import { PrismaModule } from "@/prisma";

import { multerConfig, serveStaticConfig, throtthlerConfig } from "@/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// Routes
import * as Routes from "@/routes";
const routes = Object.values(Routes);

@Module({
  imports: [
    ...routes,
    PrismaModule,
    ThrottlerModule.forRoot(throtthlerConfig),
    ServeStaticModule.forRoot(serveStaticConfig),
    MulterModule.register(multerConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, AuthMiddleware).forRoutes("*");
  }
}
