import { expect } from '@playwright/test';
import { Given, Then } from '../support/bdd';

Given('user opens the home page', async ({ page }) => {
  await page.goto('/');
});

Then('the home page slider is visible', async ({ page }) => {
  await expect(page.locator('#slider')).toBeVisible();
});
