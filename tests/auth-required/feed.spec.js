// @ts-check
const { test, expect } = require('@playwright/test');

// ─────────────────────────────────────────────────────────────────────────────
// FEED SPEC — 12 Test Cases
// File: tests/auth-required/feed.spec.js
// Uses saved session from global-setup (storageState)
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Feed Page — Layout & Navigation', () => {

  test('TC-F01: Feed page load hoti hai aur URL correct hai', async ({ page }) => {
    await page.goto('/feed');
    await expect(page).toHaveURL(/\/feed/);
    await expect(page).toHaveTitle(/Modeweltjob/i);
  });

  test('TC-F02: Navbar ke saare links visible hain', async ({ page }) => {
    await page.goto('/feed');

    // Desktop navbar
    await expect(page.locator('a[href="/feed"]').first()).toBeVisible();
    await expect(page.locator('a[href="/network"]').first()).toBeVisible();
    await expect(page.locator('a[href="/jobs"]').first()).toBeVisible();
    await expect(page.locator('a[href="/notifications"]').first()).toBeVisible();
  });

  test('TC-F03: User avatar aur displayName navbar mein dikhta hai', async ({ page }) => {
    await page.goto('/feed');

    // Navbar mein user profile link
    await expect(page.locator('a[href*="/profile/"]').first()).toBeVisible();
    // User name text
    const userName = page.locator('h3').first();
    await expect(userName).toBeVisible();
  });

  test('TC-F04: "NEW POST" create section visible hai', async ({ page }) => {
    await page.goto('/feed');
    await expect(page.locator('text=NEW POST')).toBeVisible({ timeout: 10000 });
  });

  test('TC-F05: TipTap editor (contenteditable) present hai', async ({ page }) => {
    await page.goto('/feed');
    const editor = page.locator('.ProseMirror, [contenteditable="true"]').first();
    await expect(editor).toBeVisible({ timeout: 10000 });
    // Click karke type karo
    await editor.click();
    await editor.pressSequentially('Hello Playwright!');
    const text = await editor.textContent();
    expect(text).toContain('Hello Playwright!');
  });

  test('TC-F06: "For You" aur "Following" tabs hain', async ({ page }) => {
    await page.goto('/feed');

    // Sort By selector should be visible
    const sortByLabel = page.locator('text=SORT BY:').first();
    await expect(sortByLabel).toBeVisible();

    // Click to open dropdown
    await sortByLabel.click();

    // Options should be visible
    const forYouOption = page.locator('li:has-text("For You")').first();
    const followingOption = page.locator('li:has-text("Following")').first();

    await expect(forYouOption).toBeVisible();
    await expect(followingOption).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
test.describe('Feed Page — Content Loading', () => {

  test('TC-F07: For You feed API call hota hai aur posts load hote hain', async ({ page }) => {
    // API response intercept karo
    const feedResponse = page.waitForResponse(
      (res) => res.url().includes('/api/posts/for-you') && res.status() < 400,
      { timeout: 25000 }
    );

    await page.goto('/feed');
    await feedResponse;

    // Posts ya empty state — dono valid
    const hasPost = await page.locator('[class*="shadow-md"]').first().isVisible().catch(() => false);
    const hasEmpty = await page.locator('text=No one has posted').isVisible().catch(() => false);

    expect(hasPost || hasEmpty).toBeTruthy();
  });

  test('TC-F08: "Following" tab click karne pe API call hota hai', async ({ page }) => {
    await page.goto('/feed');

    // Click to open dropdown
    await page.locator('text=SORT BY:').first().click();

    // Following API intercept
    const followingResponse = page.waitForResponse(
      (res) => res.url().includes('/api/posts/following') && res.status() < 400,
      { timeout: 25000 }
    );

    // Click Following option
    await page.locator('li:has-text("Following")').first().click();
    await followingResponse;
  });

  test('TC-F09: Following feed empty state message sahi hai', async ({ page }) => {
    await page.goto('/feed');

    // Click to open dropdown
    await page.locator('text=SORT BY:').first().click();

    const followingResponse = page.waitForResponse(
      (res) => res.url().includes('/api/posts/following'),
      { timeout: 25000 }
    );

    // Click Following option
    await page.locator('li:has-text("Following")').first().click();
    await followingResponse;

    // Posts hain ya empty message
    const hasEmpty = await page.locator('text=No post found').isVisible().catch(() => false);
    const hasPosts = await page.locator('[class*="shadow-md"]').first().isVisible().catch(() => false);
    expect(hasEmpty || hasPosts).toBeTruthy();
  });

  test('TC-F10: Page scroll karne pe aur posts fetch hote hain (Infinite Scroll)', async ({ page }) => {
    await page.goto('/feed');

    // Pehle page ke posts ka wait
    await page.waitForResponse(
      (res) => res.url().includes('/api/posts/for-you') && res.status() < 400,
      { timeout: 25000 }
    );

    // Next page API ka wait setup karo
    const nextPagePromise = page.waitForResponse(
      (res) => res.url().includes('/api/posts/for-you') && res.url().includes('cursor='),
      { timeout: 3000 }
    ).catch(() => null); // koi posts nahi toh null

    // Bottom pe scroll karo
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const response = await nextPagePromise;
    // Agar posts hain toh cursor-based pagination kaam karna chahiye
    if (response) {
      expect(response.status()).toBeLessThan(400);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
test.describe('Feed Page — Mobile & Dark Mode', () => {

  test('TC-F11: Mobile viewport pe bottom navbar visible hai', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 }); // iPhone 14
    await page.goto('/feed');

    // Mobile bottom navbar
    const mobileNav = page.locator('.fixed.bottom-0').first();
    await expect(mobileNav).toBeVisible();

    // Feed, Network, Jobs links mobile nav mein
    await expect(mobileNav.locator('a[href="/feed"]')).toBeVisible();
  });

  test('TC-F12: Dark mode localStorage se persist hota hai', async ({ page }) => {
    await page.goto('/feed');

    // Dark mode set karo localStorage mein
    await page.evaluate(() => localStorage.setItem('mw-theme', 'dark'));
    await page.reload();

    // HTML element pe dark class honi chahiye
    const htmlClass = await page.locator('html').getAttribute('class');
    expect(htmlClass).toContain('dark');

    // Cleanup
    await page.evaluate(() => localStorage.removeItem('mw-theme'));
  });
});
