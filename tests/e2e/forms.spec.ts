import { test, expect } from '@playwright/test';

test.describe('Forms Management', () => {
  test('should allow creating a new comprehensive form', async ({ page }) => {
    const formName = `Test Form ${Date.now()}`;
    const formDescription = 'This is a comprehensive test form.';

    await page.goto('/forms/new');

    await page.getByRole('textbox', { name: 'Form Name' }).fill(formName);
    await page
      .getByRole('textbox', { name: 'Description' })
      .fill(formDescription);

    const textField = page.getByRole('group', { name: 'Field 1' });
    await textField
      .getByRole('textbox', { name: 'Field label' })
      .fill('Full Name');
    await textField.getByRole('combobox', { name: 'Field type' }).click();
    await page.getByRole('option', { name: 'text' }).click();

    await page.getByRole('button', { name: 'Add Field' }).click();
    const numberField = page.getByRole('group', { name: 'Field 2' });
    await numberField.getByRole('textbox', { name: 'Field label' }).fill('Age');
    await numberField.getByRole('combobox', { name: 'Field type' }).click();
    await page.getByRole('option', { name: 'number' }).click();

    await page.getByRole('button', { name: 'Add Field' }).click();
    const checkboxField = page.getByRole('group', { name: 'Field 3' });
    await checkboxField
      .getByRole('textbox', { name: 'Field label' })
      .fill('Subscribe to newsletter');
    await checkboxField.getByRole('combobox', { name: 'Field type' }).click();
    await page.getByRole('option', { name: 'checkbox' }).click();

    await page.getByRole('button', { name: 'Add Field' }).click();
    const selectField = page.getByRole('group', { name: 'Field 4' });
    await selectField
      .getByRole('textbox', { name: 'Field label' })
      .fill('T-Shirt Size');
    await selectField.getByRole('combobox', { name: 'Field type' }).click();
    await page.getByRole('option', { name: 'select' }).click();
    await selectField.getByRole('button', { name: 'Add Option' }).click();

    const newOptionInput = selectField.getByRole('textbox', {
      name: 'Option 1',
    });
    await expect(newOptionInput).toBeVisible();
    await newOptionInput.fill('Medium');

    await page.getByRole('button', { name: 'Create Form' }).click();

    await page.waitForURL(/\/forms\/.*/);
    await expect(page.getByRole('heading', { name: formName })).toBeVisible();
    await expect(page.getByText(formDescription)).toBeVisible();
    await expect(page.getByText('Full Name', { exact: true })).toBeVisible();
    await expect(page.getByText('Age', { exact: true })).toBeVisible();
    await expect(
      page.getByText('Subscribe to newsletter', { exact: true }),
    ).toBeVisible();
    await expect(page.getByText('T-Shirt Size', { exact: true })).toBeVisible();

    await page.goto('/forms');
    await expect(page.getByRole('heading', { name: 'My Forms' })).toBeVisible();
    const createdFormRow = page.getByRole('row').filter({
      has: page.getByRole('cell', { name: formName }),
    });
    await expect(createdFormRow).toBeVisible();
    await expect(createdFormRow).toContainText(formDescription);
    await expect(
      createdFormRow.getByRole('cell', { name: '4', exact: true }),
    ).toBeVisible();
  });

  test('creates a record, persists it across navigation, and confirms destructive data actions', async ({
    page,
  }) => {
    const formName = `Record Journey ${Date.now()}`;
    await page.goto('/forms/new');
    await page.getByRole('textbox', { name: 'Form Name' }).fill(formName);
    await page
      .getByRole('textbox', { name: 'Field label' })
      .fill('Contact name');
    await page.getByRole('button', { name: 'Create Form' }).click();
    await page.waitForURL(/\/forms\/.*/);

    await page.goto('/lists');
    const formRow = page.getByRole('row').filter({ hasText: formName });
    await formRow.getByRole('link', { name: 'View List' }).click();
    await page.getByRole('button', { name: 'Add New Record' }).click();
    await page
      .getByRole('textbox', { name: 'Contact name' })
      .fill('Ada Lovelace');
    await page.getByRole('button', { name: 'Save Record' }).click();
    await expect(page.getByText('Ada Lovelace')).toBeVisible();

    await page.reload();
    await expect(page.getByText('Ada Lovelace')).toBeVisible();
    await page.getByRole('button', { name: 'Open menu' }).first().click();
    await page.getByRole('menuitem', { name: 'Delete' }).click();
    await expect(page.getByRole('alertdialog')).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(
      page.getByRole('heading', { name: 'No records yet' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Add New Record' }).click();
    await page
      .getByRole('textbox', { name: 'Contact name' })
      .fill('Grace Hopper');
    await page.getByRole('button', { name: 'Save Record' }).click();
    await page.goto('/management');
    await page.getByRole('button', { name: 'Delete All Data' }).click();
    await expect(page.getByRole('alertdialog')).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.goto('/forms');
    await expect(
      page.getByRole('heading', { name: 'No forms yet' }),
    ).toBeVisible();
    await page.goto('/lists');
    await expect(
      page.getByRole('heading', { name: 'No forms yet' }),
    ).toBeVisible();
  });
});
