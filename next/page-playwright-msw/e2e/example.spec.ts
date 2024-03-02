import { test, expect } from "./test-msw";

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveScreenshot('test-snapshot.png', { threshold: 0, maxDiffPixels: 100, fullPage: true });
});
