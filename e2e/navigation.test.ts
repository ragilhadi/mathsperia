import { expect, test } from '@playwright/test';

test('home page has visible h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
});

test('2D shapes page loads', async ({ page }) => {
	await page.goto('/2d');
	await expect(page.locator('h1')).toBeVisible();
});

test('3D shapes page loads', async ({ page }) => {
	await page.goto('/3d');
	await expect(page.locator('h1')).toBeVisible();
});

test('tools page loads', async ({ page }) => {
	await page.goto('/tools');
	await expect(page.locator('h1')).toBeVisible();
});

test('formulas page loads', async ({ page }) => {
	await page.goto('/formulas');
	await expect(page.locator('h1')).toBeVisible();
});

test('glossary page loads', async ({ page }) => {
	await page.goto('/glossary');
	await expect(page.locator('h1')).toBeVisible();
});
