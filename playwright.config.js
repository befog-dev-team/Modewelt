// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,          // auth tests sequential hone chahiye
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 2,
  reporter: 'html',

  // Global setup — ek baar login karega
  globalSetup: './tests/global-setup.js',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Timeout per action
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
  },

  projects: [
    // ─── Unauthenticated Tests ───────────────────────────────────
    {
      name: 'public',
      testMatch: '**/public/**/*.spec.js',
      use: { ...devices['Desktop Chrome'] },
    },

    // ─── Authenticated Tests ─────────────────────────────────────
    {
      name: 'authenticated-chrome',
      testMatch: '**/auth-required/**/*.spec.js',
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.join(__dirname, 'tests/.auth/user.json'),
      },
    },
    {
      name: 'authenticated-mobile',
      testMatch: '**/auth-required/**/*.spec.js',
      use: {
        ...devices['Pixel 5'],
        storageState: path.join(__dirname, 'tests/.auth/user.json'),
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
