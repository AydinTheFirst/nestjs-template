import { AppModule } from "@/app";
import { CustomValidationPipe } from "@/common/pipes";

import "dotenv/config";

import { config, swagger } from "@/config";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix("api");

  await swagger(app);

  app.useGlobalPipes(
    new CustomValidationPipe({ transform: true, whitelist: true })
  );

  await app.listen(config.port);

  const url = (await app.getUrl()).replace("[::1]", "localhost");

  Logger.debug(`Server running on ${url}`, "Bootstrap");
}
bootstrap();
