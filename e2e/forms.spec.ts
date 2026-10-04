import { test, expect } from '@playwright/test';

test.describe('Forms Management', () => {
    test('should allow creating a new comprehensive form', async ({ page }) => {
        const formName = `Test Form ${Date.now()}`;
        const formDescription = 'This is a comprehensive test form.';

        await page.goto('/forms/new');

        await page.getByRole('textbox', { name: 'Form Name' }).fill(formName);
        await page.getByRole('textbox', { name: 'Description' }).fill(formDescription);

        const textField = page.getByRole('group', { name: 'Field 1' });
        await textField.getByRole('textbox', { name: 'Field label' }).fill('Full Name');
        await textField.getByRole('combobox', { name: 'Field type' }).click();
        await page.getByRole('option', { name: 'text' }).click();

        await page.getByRole('button', { name: 'Add Field' }).click();
        const numberField = page.getByRole('group', { name: 'Field 2' });
        await numberField.getByRole('textbox', { name: 'Field label' }).fill('Age');
        await numberField.getByRole('combobox', { name: 'Field type' }).click();
        await page.getByRole('option', { name: 'number' }).click();

        await page.getByRole('button', { name: 'Add Field' }).click();
        const checkboxField = page.getByRole('group', { name: 'Field 3' });
        await checkboxField.getByRole('textbox', { name: 'Field label' }).fill('Subscribe to newsletter');
        await checkboxField.getByRole('combobox', { name: 'Field type' }).click();
        await page.getByRole('option', { name: 'checkbox' }).click();

        await page.getByRole('button', { name: 'Add Field' }).click();
        const selectField = page.getByRole('group', { name: 'Field 4' });
        await selectField.getByRole('textbox', { name: 'Field label' }).fill('T-Shirt Size');
        await selectField.getByRole('combobox', { name: 'Field type' }).click();
        await page.getByRole('option', { name: 'select' }).click();
        await selectField.getByRole('button', { name: 'Add Option' }).click();

        const newOptionInput = selectField.getByRole('textbox', { name: 'Option 1' });
        await expect(newOptionInput).toBeVisible();
        await newOptionInput.fill('Medium');

        await page.getByRole('button', { name: 'Create Form' }).click();

        await page.waitForURL(/\/forms\/.*/);
        await expect(page.getByRole('heading', { name: formName })).toBeVisible();

        await page.goto('/forms');
        await expect(page.getByRole('heading', { name: 'My Forms' })).toBeVisible();
        await expect(page.getByRole('cell', { name: formName })).toBeVisible();
    });
});
