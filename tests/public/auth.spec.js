// @ts-check
const { test, expect } = require('@playwright/test');

// ─────────────────────────────────────────────────────────────────────────────
// AUTH SPEC — 23 Test Cases
// File: tests/public/auth.spec.js
// These tests run WITHOUT a saved session (unauthenticated project)
// ─────────────────────────────────────────────────────────────────────────────

// ── Helpers ───────────────────────────────────────────────────────────────────
async function goToLogin(page) {
  await page.goto('/auth');
  await page.waitForLoadState('networkidle');
}

async function goToSignup(page) {
  await page.goto('/auth?mode=signup');
  await page.waitForLoadState('networkidle');
}

async function fillLoginForm(page, email, password) {
  await page.fill('.form-box.Login input[name="email"]', email);
  await page.fill('.form-box.Login input[type="password"]', password);
}

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 1: Login Form UI
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Login Form — UI', () => {

  test('TC-01: Auth page correct URL pe load hoti hai', async ({ page }) => {
    await goToLogin(page);
    await expect(page).toHaveURL(/\/auth/);
    await expect(page).toHaveTitle(/Modeweltjob/i);
  });

  test('TC-02: Login form ke saare elements visible hain', async ({ page }) => {
    await goToLogin(page);
    await expect(page.locator('.form-box.Login input[name="email"]')).toBeVisible();
    await expect(page.locator('.form-box.Login input[type="password"]')).toBeVisible();
    await expect(page.locator('.form-box.Login button[type="submit"]')).toBeVisible();
    await expect(page.locator('.form-box.Login a[href="/auth/google"]')).toBeVisible();
    await expect(page.locator('.form-box.Login a[href="/auth/forget-password"]')).toBeVisible();
  });

  test('TC-03: MW logo / branding visible hai', async ({ page }) => {
    await goToLogin(page);
    const logoText = page.locator('.form-box.Login').getByText('MW');
    await expect(logoText).toBeVisible();
    const welcomeText = page.locator('.form-box.Login').getByText('Welcome');
    await expect(welcomeText).toBeVisible();
  });

  test('TC-04: Password show/hide toggle kaam karta hai', async ({ page }) => {
    await goToLogin(page);
    const passInput = page.locator('.form-box.Login input[name="password"]').first();

    // Shuru mein password type hona chahiye
    await expect(passInput).toHaveAttribute('type', 'password');

    // Eye icon click karo
    await page.locator('.form-box.Login span:has(svg)').first().click();

    // Ab text type hona chahiye
    await expect(passInput).toHaveAttribute('type', 'text');

    // Dobara click karo → wapas password
    await page.locator('.form-box.Login span:has(svg)').first().click();
    await expect(passInput).toHaveAttribute('type', 'password');
  });

  test('TC-05: "Create account" button signup form dikhata hai', async ({ page }) => {
    await goToLogin(page);
    await page.click('.form-box.Login button:has-text("Create account")');
    // Signup specific fields appear hone chahiye
    await expect(page.locator('.form-box.Register input[name="username"]')).toBeVisible({ timeout: 5000 });
  });

  test('TC-06: "Reset password" link forget-password page pe le jaata hai', async ({ page }) => {
    await goToLogin(page);
    await page.click('.form-box.Login a[href="/auth/forget-password"]');
    await expect(page).toHaveURL(/forget-password/);
  });

  test('TC-07: Google OAuth button `/auth/google` link hai', async ({ page }) => {
    await goToLogin(page);
    const googleBtn = page.locator('.form-box.Login a[href="/auth/google"]');
    await expect(googleBtn).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 2: Login — Happy Path & Error Path
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Login — Happy & Error Paths', () => {

  test('TC-08: Sahi credentials se /feed pe redirect hota hai', async ({ page }) => {
    await goToLogin(page);
    await fillLoginForm(
      page,
      process.env.TEST_EMAIL || 'vinaysharma31681@gmail.com',
      process.env.TEST_PASSWORD || 'Vinay@123'
    );
    await page.click('.form-box.Login button[type="submit"]');

    // Feed pe redirect
    await expect(page).toHaveURL(/\/feed/, { timeout: 15000 });
  });

  test('TC-09: Galat password se error aata hai', async ({ page }) => {
    await goToLogin(page);
    await fillLoginForm(page, 'vinaysharma31681@gmail.com', 'wrongpassword999');
    await page.click('.form-box.Login button[type="submit"]');

    // Wait for the error block/toast
    await expect(
      page.locator('.bg-red-500, [class*="toast"], [role="status"]').first()
    ).toBeVisible({ timeout: 8000 });
  });

  test('TC-10: Registered nahi email se error aata hai', async ({ page }) => {
    await goToLogin(page);
    await fillLoginForm(page, 'notregistered_xyz123@test.com', 'test1234');
    await page.click('.form-box.Login button[type="submit"]');

    await expect(
      page.locator('.bg-red-500, [class*="toast"], [role="status"]').first()
    ).toBeVisible({ timeout: 8000 });
  });

  test('TC-11: Email verify nahi kiya → error message', async ({ page }) => {
    await goToLogin(page);
    await fillLoginForm(page, 'unverified@modewelt.com', 'test1234');
    await page.click('.form-box.Login button[type="submit"]');

    await expect(
      page.locator('.bg-red-500, [class*="toast"], [role="status"]').first()
    ).toBeVisible({ timeout: 8000 });
  });

  test('TC-12: Empty form submit karo → redirect nahi hota', async ({ page }) => {
    await goToLogin(page);
    // Submit click
    await page.click('.form-box.Login button[type="submit"]');
    // Page change nahi honi chahiye
    await expect(page).toHaveURL(/\/auth/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 3: Signup Form
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Signup Form — UI & Validation', () => {

  test('TC-13: Signup form ke saare 5 fields visible hain', async ({ page }) => {
    await goToSignup(page);
    await expect(page.locator('.form-box.Register input[name="username"]')).toBeVisible();
    await expect(page.locator('.form-box.Register input[name="email"]')).toBeVisible();
    await expect(page.locator('.form-box.Register input[name="phone"]')).toBeVisible();
    await expect(page.locator('.form-box.Register input[name="password"]')).toBeVisible();
    await expect(page.locator('.form-box.Register input[name="confirmPassword"]')).toBeVisible();
  });

  test('TC-14: "Login" link signup form se login pe wapas le jaata hai', async ({ page }) => {
    await goToSignup(page);
    await page.click('.form-box.Register .SignInLink');
    await expect(page.locator('.form-box.Login')).toBeVisible({ timeout: 5000 });
  });

  test('TC-15: Password mismatch pe error toast aata hai', async ({ page }) => {
    await goToSignup(page);
    await page.fill('.form-box.Register input[name="username"]', 'playwrighttest99');
    await page.fill('.form-box.Register input[name="email"]', 'pwtest99@modewelt.com');
    await page.fill('.form-box.Register input[name="phone"]', '9876543210');
    await page.fill('.form-box.Register input[name="password"]', 'pass1234');
    await page.fill('.form-box.Register input[name="confirmPassword"]', 'pass9999'); // mismatch
    await page.click('.form-box.Register button[type="submit"]');

    await expect(
      page.locator('.bg-red-500, [class*="toast"], [role="status"]').first()
    ).toBeVisible({ timeout: 8000 });
  });

  test('TC-16: Duplicate email pe "Email is already taken" error', async ({ page }) => {
    await goToSignup(page);
    await page.fill('.form-box.Register input[name="username"]', 'newuser_xyz999');
    await page.fill('.form-box.Register input[name="email"]', 'vinaysharma31681@gmail.com');
    await page.fill('.form-box.Register input[name="phone"]', '9876543210');
    await page.fill('.form-box.Register input[name="password"]', 'test1234');
    await page.fill('.form-box.Register input[name="confirmPassword"]', 'test1234');
    await page.click('.form-box.Register button[type="submit"]');

    await expect(
      page.locator('.bg-red-500, [class*="toast"], [role="status"]').first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('TC-17: Duplicate username pe "Username is already taken" error', async ({ page }) => {
    await goToSignup(page);
    await page.fill('.form-box.Register input[name="username"]', 'vinaysharma31681');
    await page.fill('.form-box.Register input[name="email"]', 'brandnew_xyz999@test.com');
    await page.fill('.form-box.Register input[name="phone"]', '9876543210');
    await page.fill('.form-box.Register input[name="password"]', 'test1234');
    await page.fill('.form-box.Register input[name="confirmPassword"]', 'test1234');
    await page.click('.form-box.Register button[type="submit"]');

    await expect(
      page.locator('.bg-red-500, [class*="toast"], [role="status"]').first()
    ).toBeVisible({ timeout: 10000 });
  });

  test('TC-18: 4 char se kam password Pe Zod error', async ({ page }) => {
    await goToSignup(page);
    await page.fill('.form-box.Register input[name="username"]', 'userxyz');
    await page.fill('.form-box.Register input[name="email"]', 'userxyz@test.com');
    await page.fill('.form-box.Register input[name="phone"]', '9876543210');
    await page.fill('.form-box.Register input[name="password"]', '123'); // too short
    await page.fill('.form-box.Register input[name="confirmPassword"]', '123');
    await page.click('.form-box.Register button[type="submit"]');

    await expect(
      page.locator('.bg-red-500, [class*="toast"], [role="status"]').first()
    ).toBeVisible({ timeout: 5000 });
  });

  test('TC-19: Special characters in username Pe Zod error', async ({ page }) => {
    await goToSignup(page);
    await page.fill('.form-box.Register input[name="username"]', 'user name!@#');
    await page.fill('.form-box.Register input[name="email"]', 'test@test.com');
    await page.fill('.form-box.Register input[name="phone"]', '9876543210');
    await page.fill('.form-box.Register input[name="password"]', 'test1234');
    await page.fill('.form-box.Register input[name="confirmPassword"]', 'test1234');
    await page.click('.form-box.Register button[type="submit"]');

    await expect(
      page.locator('.bg-red-500, [class*="toast"], [role="status"]').first()
    ).toBeVisible({ timeout: 5000 });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 4: Auth Redirects (Security)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Auth Redirects — Security', () => {

  test('TC-20: Unauthenticated user /feed pe redirect hota hai', async ({ page }) => {
    await page.goto('/feed');
    await expect(page).not.toHaveURL(/\/feed/);
  });

  test('TC-21: Unauthenticated user /jobs pe redirect hota hai', async ({ page }) => {
    await page.goto('/jobs');
    await expect(page).not.toHaveURL(/\/jobs/);
  });

  test('TC-22: Unauthenticated user /network pe redirect hota hai', async ({ page }) => {
    await page.goto('/network');
    await expect(page).not.toHaveURL(/\/network/);
  });

  test('TC-23: Unauthenticated user /chat pe redirect hota hai', async ({ page }) => {
    await page.goto('/chat');
    await expect(page).not.toHaveURL(/\/chat/);
  });
});
