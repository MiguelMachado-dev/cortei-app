/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

const enableStorybookVitest = process.env.STORYBOOK_VITEST === "true";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    restoreMocks: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["src/**/*.stories.*"],
    coverage: {
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "coverage/unit",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.stories.*",
        "src/**/__tests__/**",
        "src/**/*.d.ts",
      ],
    },
    ...(enableStorybookVitest
      ? {
        projects: [
          {
            extends: true,
            plugins: [
              // The plugin will run tests for the stories defined in your Storybook config
              // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
              storybookTest({
                configDir: path.join(dirname, ".storybook"),
              }),
            ],
            test: {
              browser: {
                enabled: true,
                headless: true,
                provider: "playwright",
                instances: [
                  {
                    browser: "chromium",
                  },
                ],
              },
              setupFiles: [".storybook/vitest.setup.ts"],
            },
          },
        ],
      }
      : {}),
  },
});
