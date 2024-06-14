import { defineConfig, type Options } from "tsup";

const tsupConfig = {
  entry: ["./src/index.ts"],
  minify: true,
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
} satisfies Options;

export default defineConfig(tsupConfig);
