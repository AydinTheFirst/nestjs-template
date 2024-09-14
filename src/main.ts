import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/routes/app";
import config, { swagger } from "@/config";
import { Logger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix("api");

  swagger(app);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(config.port, () => {
    Logger.log(
      `Server running on http://localhost:${config.port}`,
      "Bootstrap"
    );
  });
}
bootstrap();
