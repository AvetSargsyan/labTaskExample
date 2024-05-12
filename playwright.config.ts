import {defineConfig, devices} from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 3,
  reporter: [
    ["line"],
    [
      "allure-playwright",
      {
        outputFolder: "allure-reports",
        suiteTitle: true,
        detail: true,
        environmentInfo: {},
      },
    ],
  ],
  use: {
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: {...devices["Desktop Chrome"]},
    },
  ],
});
