import { defineConfig, type Options } from "tsup";

const tsupConfig = {
  entry: ["./src/**/*.ts", "./src/**/*.tsx"],
  minify: true,
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
} satisfies Options;

export default defineConfig(tsupConfig);
