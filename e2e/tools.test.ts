import { expect, test } from '@playwright/test';

test('trigonometry page loads', async ({ page }) => {
	await page.goto('/tools/trig');
	await expect(page.locator('h1')).toBeVisible();
});

test('unit converter loads', async ({ page }) => {
	await page.goto('/tools/convert');
	await expect(page.locator('h1')).toBeVisible();
});

test('distance calculator loads', async ({ page }) => {
	await page.goto('/tools/distance');
	await expect(page.locator('h1')).toBeVisible();
});
