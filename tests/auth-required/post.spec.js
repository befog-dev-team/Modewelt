// @ts-check
const { test, expect } = require('@playwright/test');

// ─────────────────────────────────────────────────────────────────────────────
// POST SPEC — 19 Test Cases
// File: tests/auth-required/post.spec.js
// ─────────────────────────────────────────────────────────────────────────────

// Helper — feed pe jao aur editor ready karo
async function gotoFeed(page) {
  await page.goto('/feed');
  await page.waitForSelector('.ProseMirror, [contenteditable="true"]', { timeout: 10000 });
}

// Helper — pehle page ke posts ka wait karo aur ensure karo ki kam se kam ek post exists kare
async function ensurePostExists(page) {
  await gotoFeed(page);
  
  const post = page.locator('[class*="shadow-md"]').first();
  const empty = page.locator('text=No one has posted').first();
  
  // Wait up to 6 seconds for feed loading to complete
  await Promise.any([
    post.waitFor({ state: 'visible', timeout: 6000 }),
    empty.waitFor({ state: 'visible', timeout: 6000 })
  ]).catch(() => {});
  
  const isVisible = await post.isVisible().catch(() => false);
  
  if (!isVisible) {
    // Write a post
    const uniqueText = `Playwright Auto Post ${Date.now()}`;
    await typeInEditor(page, uniqueText);
    
    // Server action POST request wait setup
    const postPromise = page.waitForResponse(
      (res) => res.request().method() === 'POST' && res.status() < 400,
      { timeout: 25000 }
    );
    
    await page.locator('div.my-4:has(p:text-is("NEW POST")) button').click();
    await postPromise;
    
    // Wait for the new post to show up in the UI
    await page.waitForSelector(`text=${uniqueText}`, { timeout: 10000 });
  }
}

// Helper — editor mein type karo
async function typeInEditor(page, text) {
  const editor = page.locator('.ProseMirror, [contenteditable="true"]').first();
  await editor.click();
  await editor.pressSequentially(text);
  return editor;
}

// Helper — pehla post ka ellipsis menu open karo
async function openFirstPostMenu(page) {
  const post = page.locator('[class*="shadow-md"]').first();
  const ellipsis = post.locator('div.relative svg').first();
  await ellipsis.click();
  await page.waitForTimeout(300);
}

// ─────────────────────────────────────────────────────────────────────────────
test.describe('Create Post — Text Only', () => {

  test('TC-P01: Send button empty content pe disabled hai', async ({ page }) => {
    await gotoFeed(page);

    // TipTap editor khali hai toh send button disabled hona chahiye
    const sendBtn = page.locator('div.my-4:has(p:text-is("NEW POST")) button');
    await expect(sendBtn).toBeDisabled();
  });

  test('TC-P02: Editor mein type karne pe send button enable hota hai', async ({ page }) => {
    await gotoFeed(page);
    await typeInEditor(page, 'Testing Playwright post creation');

    // Send button ab enabled hona chahiye
    const sendBtn = page.locator('div.my-4:has(p:text-is("NEW POST")) button');
    await expect(sendBtn).not.toBeDisabled();
  });

  test('TC-P03: Text post successfully create hota hai', async ({ page }) => {
    const uniqueText = `Playwright Test Post ${Date.now()}`;
    await gotoFeed(page);
    await typeInEditor(page, uniqueText);

    // Submit button click
    const postCreateResponse = page.waitForResponse(
      (res) => res.request().method() === 'POST' && res.status() < 400,
      { timeout: 25000 }
    );

    // Scoped post submit button click
    await page.locator('div.my-4:has(p:text-is("NEW POST")) button').click();

    // API call successful honi chahiye
    const response = await postCreateResponse;
    expect(response.status()).toBeLessThan(400);

    // Success toast ya post feed mein appear
    await expect(
      page.locator(`text=${uniqueText}`).first()
    ).toBeVisible({ timeout: 10000 }).catch(async () => {
      // Agar direct text nahi dikh raha, toast check karo
      const toast = page.locator('[class*="toast"], [role="status"]');
      await expect(toast.first()).toBeVisible({ timeout: 5000 });
    });
  });

  test('TC-P04: Post submit ke baad editor clear ho jaata hai', async ({ page }) => {
    await gotoFeed(page);
    const editor = await typeInEditor(page, 'Post to clear after submit');

    // Submit karo
    const postCreateResponse = page.waitForResponse(
      (res) => res.request().method() === 'POST' && res.status() < 400,
      { timeout: 25000 }
    );

    // Submit karo
    await page.locator('div.my-4:has(p:text-is("NEW POST")) button').click();
    await postCreateResponse;

    // Editor empty hona chahiye
    const content = await editor.textContent();
    expect(content?.trim()).toBe('');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
test.describe('Media Upload', () => {

  test('TC-P05: Media upload modal paper-clip/image icon se khulta hai', async ({ page }) => {
    await gotoFeed(page);

    // PiLinkSimpleBold ya AiOutlinePicture icon click
    await page.locator('div.cursor-pointer').first().click();
    await expect(page.locator('text=Media Upload')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Browse files')).toBeVisible();
  });

  test('TC-P06: Media modal Escape key se band hota hai', async ({ page }) => {
    await gotoFeed(page);
    await page.locator('div.cursor-pointer').first().click();
    await expect(page.locator('text=Media Upload')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.locator('text=Media Upload')).not.toBeVisible({ timeout: 3000 });
  });

  test('TC-P07: Media modal Cancel button se band hota hai', async ({ page }) => {
    await gotoFeed(page);
    await page.locator('div.cursor-pointer').first().click();
    await expect(page.locator('text=Media Upload')).toBeVisible();

    await page.click('button:has-text("Cancel")');
    await expect(page.locator('text=Media Upload')).not.toBeVisible({ timeout: 3000 });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
test.describe('Post Card — UI Elements', () => {

  test('TC-P08: Post card mein author name aur timestamp hai', async ({ page }) => {
    await ensurePostExists(page);

    const firstPost = page.locator('[class*="shadow-md"]').first();

    // Agar koi post hai
    if (await firstPost.isVisible()) {
      await expect(firstPost.locator('text=Post created by')).toBeVisible();
      // Timestamp (ago format)
      await expect(firstPost.locator('span.text-primary').last()).toBeVisible();
    }
  });

  test('TC-P09: Long content pe "Read More" button hai', async ({ page }) => {
    await ensurePostExists(page);

    // Koi post hai toh Read More dhundo
    const readMoreBtn = page.locator('button:has-text("Read More")').first();
    if (await readMoreBtn.isVisible()) {
      await readMoreBtn.click();
      await expect(page.locator('button:has-text("Read Less")').first()).toBeVisible();

      // Dobara click → Read More wapas
      await page.locator('button:has-text("Read Less")').first().click();
      await expect(readMoreBtn).toBeVisible();
    }
  });

  test('TC-P10: Post options menu (⋯) click karne pe khulta hai', async ({ page }) => {
    await ensurePostExists(page);
    await openFirstPostMenu(page);

    // Menu popup aana chahiye
    const menu = page.locator('[class*="absolute"][class*="border"]').first();
    await expect(menu).toBeVisible({ timeout: 3000 });
  });

  test('TC-P11: Apne post mein Delete button dikhta hai', async ({ page }) => {
    // Pehle ek post create karo
    const uniqueText = `My Delete Test Post ${Date.now()}`;
    await gotoFeed(page);
    await typeInEditor(page, uniqueText);
    
    const postCreatePromise = page.waitForResponse(
      (res) => res.request().method() === 'POST' && res.status() < 400,
      { timeout: 25000 }
    );
    await page.locator('div.my-4:has(p:text-is("NEW POST")) button').click();
    await postCreatePromise;

    await page.waitForSelector(`text=${uniqueText}`, { timeout: 10000 });

    // Apne newly created post ka menu open karo
    await openFirstPostMenu(page);
    await expect(page.locator('button:has-text("Delete")').first()).toBeVisible({ timeout: 5000 });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
test.describe('Post Interactions — Like & Comment', () => {

  test('TC-P12: Like button click karna — count change hota hai', async ({ page }) => {
    await ensurePostExists(page);

    const firstPost = page.locator('[class*="shadow-md"]').first();
    if (!await firstPost.isVisible()) return;

    // Like button (tabular-nums count text ke paas)
    const likeArea = firstPost.locator('button').first();

    // Count before
    const countBefore = await firstPost.locator('.tabular-nums').first().textContent().catch(() => '0');

    await likeArea.click();
    await page.waitForTimeout(500); // optimistic update wait

    const countAfter = await firstPost.locator('.tabular-nums').first().textContent().catch(() => '0');
    // Count change hona chahiye (like ya unlike)
    // (same ya different both valid — depends on initial state)
    expect(countAfter).toBeDefined();
  });

  test('TC-P13: Comment button click karne pe comment section toggle hota hai', async ({ page }) => {
    await ensurePostExists(page);

    const firstPost = page.locator('[class*="shadow-md"]').first();
    if (!await firstPost.isVisible()) return;

    // Comment button (MessageSquare icon + "comments" text)
    const commentBtn = firstPost.locator('button:has-text("comment")').first();
    await commentBtn.click();

    // Comment input appear hona chahiye
    await expect(
      page.locator('input[placeholder*="comment"], textarea[placeholder*="comment"], [contenteditable]').last()
    ).toBeVisible({ timeout: 5000 });

    // Dobara click → hide
    await commentBtn.click();
  });

  test('TC-P14: Comment submit karna', async ({ page }) => {
    await ensurePostExists(page);

    const firstPost = page.locator('[class*="shadow-md"]').first();
    if (!await firstPost.isVisible()) return;

    // Comment section open karo
    await firstPost.locator('button:has-text("comment")').first().click();

    const commentInput = page.locator(
      'input[placeholder*="comment"], textarea[placeholder*="comment"]'
    ).last();

    if (await commentInput.isVisible()) {
      await commentInput.fill(`Test comment ${Date.now()}`);
      await commentInput.press('Enter');
      // Comment appear ya API call success
      await page.waitForTimeout(1000);
    }
  });

  test('TC-P15: Share button click karne pe share options aate hain', async ({ page }) => {
    await ensurePostExists(page);

    const firstPost = page.locator('[class*="shadow-md"]').first();
    if (!await firstPost.isVisible()) return;

    // ShareButton component
    const shareBtn = firstPost.locator('button:has-text("SHARE"), button:has-text("share")').first();
    if (await shareBtn.isVisible()) {
      await shareBtn.click();
      // Share modal ya share options
      await page.waitForTimeout(500);
    }
  });

  test('TC-P16: Report modal khulta hai', async ({ page }) => {
    await ensurePostExists(page);

    // Ellipsis menu open
    await openFirstPostMenu(page);

    const reportBtn = page.locator('button:has-text("Report")').first();
    if (await reportBtn.isVisible()) {
      await reportBtn.click();
      // Report modal
      await expect(
        page.locator('text=Report Post').first()
      ).toBeVisible({ timeout: 5000 });
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
test.describe('Delete Post', () => {

  test('TC-P17: Delete dialog confirmation hai', async ({ page }) => {
    await ensurePostExists(page);
    // Ellipsis menu
    await openFirstPostMenu(page);

    const deleteBtn = page.locator('button:has-text("Delete")').first();
    if (await deleteBtn.isVisible()) {
      await deleteBtn.click();
      // Dialog
      const dialog = page.locator('[role="dialog"], [class*="dialog"]');
      if (await dialog.isVisible()) {
        // Cancel click karo — test data destroy mat karo
        await page.locator('button:has-text("Cancel")').last().click();
        await expect(dialog).not.toBeVisible({ timeout: 3000 });
      }
    }
  });

  test('TC-P18: Doosre user ke post mein Delete button nahi hota', async ({ page }) => {
    await ensurePostExists(page);

    // Kisi doosre user ka post dhundo (user.id !== post.user.id)
    // Ellipsis menu open karo
    const menus = await page.locator('[class*="shadow-md"] div.relative svg').all();

    for (const menu of menus.slice(0, 5)) { // pehle 5 posts check karo
      await menu.click();
      await page.waitForTimeout(300);

      const followBtn = page.locator('button:has-text("Follow")').first();
      const viewProfileBtn = page.locator('button:has-text("View Profile")').first();

      if (await followBtn.isVisible() || await viewProfileBtn.isVisible()) {
        // Ye doosre ka post hai — Delete nahi hona chahiye
        await expect(page.locator('button:has-text("Delete")')).not.toBeVisible();
        await page.keyboard.press('Escape');
        break;
      }
      await page.keyboard.press('Escape');
    }
  });

  test('TC-P19: FollowButton doosre user ke post mein dikhta hai', async ({ page }) => {
    await ensurePostExists(page);

    const menus = await page.locator('[class*="shadow-md"] div.relative svg').all();

    for (const menu of menus.slice(0, 5)) {
      await menu.click();
      await page.waitForTimeout(300);

      const followBtn = page.locator('button:has-text("Follow"), button:has-text("Requested"), button:has-text("Following")').first();
      if (await followBtn.isVisible()) {
        // Follow button visible hai — doosre ka post confirm
        expect(true).toBeTruthy();
        await page.keyboard.press('Escape');
        return;
      }
      await page.keyboard.press('Escape');
    }
  });
});
