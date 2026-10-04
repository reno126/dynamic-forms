import { test, expect } from '@playwright/test';

test('should navigate to the home page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Dynamic Forms/);

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
