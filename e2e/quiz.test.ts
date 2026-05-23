import { expect, test } from '@playwright/test';

test('2D quiz page loads with config visible', async ({ page }) => {
	await page.goto('/quiz/2d');
	await expect(page.locator('h1')).toBeVisible();
	await expect(page.getByText(/start/i)).toBeVisible();
});
