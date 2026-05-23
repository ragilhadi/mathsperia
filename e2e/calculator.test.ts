import { expect, test } from '@playwright/test';

test('circle calculator loads with result chips', async ({ page }) => {
	await page.goto('/2d/circle');
	await expect(page.locator('h1')).toBeVisible();
	await expect(page.locator('.result-chip')).toHaveCount(2);
});

test('cube calculator loads with result chips', async ({ page }) => {
	await page.goto('/3d/cube');
	await expect(page.locator('h1')).toBeVisible();
	await expect(page.locator('.result-chip')).toHaveCount(2);
});

test('changing radius slider updates results', async ({ page }) => {
	await page.goto('/2d/circle');
	const resultChips = page.locator('.result-chip');
	await expect(resultChips).toHaveCount(2);
	const initialArea = await resultChips.first().textContent();

	const radiusInput = page.locator('input[type="range"]').first();
	await radiusInput.fill('10');
	await radiusInput.dispatchEvent('input');

	await expect(resultChips.first()).not.toHaveText(initialArea ?? '');
});
