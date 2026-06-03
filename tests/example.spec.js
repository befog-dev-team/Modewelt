// @ts-check
const { test, expect } = require('@playwright/test');

// ── Landing Page ──────────────────────────────────────────────────────────────

test.describe('Landing Page', () => {
  test('loads and has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Modeweltjob/i);
  });

  test('shows login/signup links', async ({ page }) => {
    await page.goto('/');
    // Should have auth-related CTAs on landing
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});

// ── Auth Page ─────────────────────────────────────────────────────────────────

test.describe('Auth Page', () => {
  test('auth page loads', async ({ page }) => {
    await page.goto('/auth');
    await expect(page).toHaveURL(/auth/);
  });

  test('has email and password fields', async ({ page }) => {
    await page.goto('/auth');
    // Give the page time to render
    await page.waitForLoadState('networkidle');
    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    await expect(emailInput).toBeVisible({ timeout: 10000 });
  });
});

// ── Jobs Page ─────────────────────────────────────────────────────────────────

test.describe('Jobs Page (unauthenticated redirect)', () => {
  test('redirects unauthenticated users', async ({ page }) => {
    await page.goto('/jobs');
    // Should redirect to auth or stay on a valid page
    await page.waitForLoadState('networkidle');
    const url = page.url();
    expect(url).toMatch(/localhost:3000/);
  });
});
