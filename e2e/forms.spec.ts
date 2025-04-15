import { test, expect } from '@playwright/test';

test.describe('Forms Management', () => {
    test('should allow creating a new comprehensive form', async ({ page }) => {
        const formName = `Test Form ${Date.now()}`;
        const formDescription = 'This is a comprehensive test form.';

        await page.goto('/forms/new');

        await page.getByTestId('form-name-input').fill(formName);
        await page.getByTestId('form-description-input').fill(formDescription);

        const textField = page.getByTestId('form-field-builder-item-0');
        await textField.getByTestId('field-label-input').fill('Full Name');
        await textField.getByTestId('field-type-select').click();
        await page.getByRole('option', { name: 'text' }).click();

        await page.getByRole('button', { name: 'Add Field' }).click();
        const numberField = page.getByTestId('form-field-builder-item-1');
        await numberField.getByTestId('field-label-input').fill('Age');
        await numberField.getByTestId('field-type-select').click();
        await page.getByRole('option', { name: 'number' }).click();

        await page.getByRole('button', { name: 'Add Field' }).click();
        const checkboxField = page.getByTestId('form-field-builder-item-2');
        await checkboxField.getByTestId('field-label-input').fill('Subscribe to newsletter');
        await checkboxField.getByTestId('field-type-select').click();
        await page.getByRole('option', { name: 'checkbox' }).click();

        await page.getByRole('button', { name: 'Add Field' }).click();
        const selectField = page.getByTestId('form-field-builder-item-3');
        await selectField.getByTestId('field-label-input').fill('T-Shirt Size');
        await selectField.getByTestId('field-type-select').click();
        await page.getByRole('option', { name: 'select' }).click();
        await selectField.getByTestId('add-select-option-button').click();

        const newOptionInput = selectField.getByTestId('select-option-input-0');
        await expect(newOptionInput).toBeVisible();
        await newOptionInput.fill('Medium');

        await page.getByRole('button', { name: 'Create Form' }).click();

        await page.waitForURL(/\/forms\/.*/);
        const title = page.getByTestId('form-details-title');
        await expect(title).toHaveText(formName);

        await page.goto('/forms');
        await expect(page.getByTestId('page-header-my-forms')).toBeVisible();
        await expect(page.getByRole('cell', { name: formName })).toBeVisible();
    });
}); 