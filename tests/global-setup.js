// @ts-check
const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

/**
 * Global Setup — runs ONCE before all tests.
 * Logs in as the test user and saves the session (cookies) to a file.
 * All authenticated tests reuse this saved session — no repeated logins.
 */
module.exports = async () => {
  // Load .env.test manually to avoid missing dependency errors (like dotenv)
  const envPath = path.join(__dirname, '.env.test');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const parts = trimmed.split('=');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const value = parts.slice(1).join('=').trim();
          process.env[key] = value;
        }
      }
    });
  }

  const TEST_EMAIL = process.env.TEST_EMAIL || 'testuser@modewelt.com';
  const TEST_PASSWORD = process.env.TEST_PASSWORD || 'test1234';

  // Make sure the .auth directory exists
  const authDir = path.join(__dirname, '.auth');
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log(`\n🔐 Global Setup: Logging in as test user (${TEST_EMAIL})...`);

  try {
    await page.goto('http://localhost:3000/auth');
    await page.waitForLoadState('networkidle');

    // Fill login form
    const emailInput = page.locator('input[name="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();

    await emailInput.fill(TEST_EMAIL);
    await passwordInput.fill(TEST_PASSWORD);

    // Submit
    await page.click('button[type="submit"]');

    // Wait for redirect to /feed
    await page.waitForURL('**/feed', { timeout: 15000 });

    // Save session
    await page.context().storageState({ path: path.join(authDir, 'user.json') });
    console.log('✅ Global Setup: Session saved to tests/.auth/user.json\n');
  } catch (error) {
    console.error('❌ Global Setup Failed!');
    console.error('Current URL is:', page.url());
    // Print any visible error message on the page
    const bodyText = await page.locator('body').innerText();
    console.error('Visible Page Text Snippet:', bodyText.substring(0, 500));
    throw error;
  } finally {
    await browser.close();
  }
};

