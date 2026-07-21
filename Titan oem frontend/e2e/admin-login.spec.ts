import { test, expect } from '@playwright/test';

test('admin login page loads correctly', async ({ page }) => {
  await page.goto('/admin-login');

  await expect(page).toHaveURL(/\/admin-login$/);
  await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible();
  await expect(
    page.getByText('Sign in to access the OEM management console.')
  ).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
});
