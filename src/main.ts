import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import "dotenv/config";

import config, { swagger } from "@/config";
import { AppModule } from "@/routes/app";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix("api");

  swagger(app);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(config.port, () => {
    Logger.log(
      `Server running on http://localhost:${config.port}`,
      "Bootstrap"
    );
  });
}
bootstrap();
