import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const swagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle("API Documentation")
    .setDescription("API Documentation")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/swagger", app, document);
};
