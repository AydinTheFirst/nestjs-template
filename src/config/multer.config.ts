import multer from "multer";

import { MulterModuleOptions } from "@nestjs/platform-express";

export const multerConfig: MulterModuleOptions = {
  storage: multer.memoryStorage(),
};
