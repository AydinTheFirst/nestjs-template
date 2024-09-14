import yaml from "yaml";
import fs from "fs";
import join from "path";

const path = join.resolve(__dirname, "..", "..", "config.yaml");
const configFile = yaml.parse(fs.readFileSync(path, "utf8"));

interface Config {
  title: string;
  port: number;
}

export default {
  ...configFile,
} as Config;

export * from "./swagger";
export * from "./serveStatic";
export * from "./throttler";
export * from "./multer";
