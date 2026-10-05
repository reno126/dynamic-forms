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
    await expect(page.getByText(formName, { exact: true })).toBeVisible();
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
    await expect(
      page.getByRole('cell', { name: 'Ada Lovelace', exact: true }),
    ).toBeVisible();

    await page.reload();
    await expect(
      page.getByRole('cell', { name: 'Ada Lovelace', exact: true }),
    ).toBeVisible();
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
      page.getByRole('heading', { name: 'No forms found' }),
    ).toBeVisible();
  });

  test('updates an existing record and keeps the edited value after reload', async ({
    page,
  }) => {
    const formName = `Record Edit Journey ${Date.now()}`;
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
    await expect(
      page.getByRole('cell', { name: 'Ada Lovelace', exact: true }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('menuitem', { name: 'Edit' }).click();
    const editDialog = page.getByRole('dialog');
    await expect(
      editDialog.getByRole('textbox', { name: 'Contact name' }),
    ).toHaveValue('Ada Lovelace');
    await editDialog
      .getByRole('textbox', { name: 'Contact name' })
      .fill('Ada Byron');
    await editDialog.getByRole('button', { name: 'Save Changes' }).click();

    await expect(
      page.getByRole('cell', { name: 'Ada Byron', exact: true }),
    ).toBeVisible();
    await page.reload();
    await expect(
      page.getByRole('cell', { name: 'Ada Byron', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('cell', { name: 'Ada Lovelace', exact: true }),
    ).toHaveCount(0);
  });

  test('submits representative values for each supported record field type', async ({
    page,
  }) => {
    const formName = `Typed Record Journey ${Date.now()}`;
    const fieldDefinitions = [
      { label: 'Full name', type: 'text' },
      { label: 'Age', type: 'number' },
      { label: 'Birthday', type: 'date' },
      { label: 'Favorite size', type: 'select' },
      { label: 'Newsletter', type: 'checkbox' },
    ];

    await page.goto('/forms/new');
    await page.getByRole('textbox', { name: 'Form Name' }).fill(formName);

    for (const [fieldIndex, fieldDefinition] of fieldDefinitions.entries()) {
      if (fieldIndex > 0) {
        await page.getByRole('button', { name: 'Add Field' }).click();
      }

      const builderField = page.getByRole('group', {
        name: `Field ${fieldIndex + 1}`,
      });
      await builderField
        .getByRole('textbox', { name: 'Field label' })
        .fill(fieldDefinition.label);
      await builderField.getByRole('combobox', { name: 'Field type' }).click();
      await page.getByRole('option', { name: fieldDefinition.type }).click();

      if (fieldDefinition.type === 'select') {
        await builderField.getByRole('button', { name: 'Add Option' }).click();
        await builderField
          .getByRole('textbox', { name: 'Option 1' })
          .fill('Medium');
      }
    }

    await page.getByRole('button', { name: 'Create Form' }).click();
    await page.waitForURL(/\/forms\/.*/);
    await page.goto('/lists');
    const formRow = page.getByRole('row').filter({ hasText: formName });
    await formRow.getByRole('link', { name: 'View List' }).click();
    await page.getByRole('button', { name: 'Add New Record' }).click();

    const recordDialog = page.getByRole('dialog');
    await recordDialog.getByLabel('Full name').fill('Grace Hopper');
    await recordDialog.getByLabel('Age').fill('85');
    await recordDialog.getByLabel('Birthday').fill('1906-12-09');
    await recordDialog.getByRole('combobox', { name: 'Favorite size' }).click();
    await page.getByRole('option', { name: 'Medium' }).click();
    await recordDialog.getByRole('checkbox', { name: 'Newsletter' }).check();
    await recordDialog.getByRole('button', { name: 'Save Record' }).click();

    const savedRecordRow = page.getByRole('row').filter({
      has: page.getByRole('cell', { name: 'Grace Hopper', exact: true }),
    });
    await expect(savedRecordRow).toBeVisible();
    await expect(
      savedRecordRow.getByRole('cell', { name: '85', exact: true }),
    ).toBeVisible();
    await expect(
      savedRecordRow.getByRole('cell', { name: '1906-12-09', exact: true }),
    ).toBeVisible();
    await expect(
      savedRecordRow.getByRole('cell', { name: 'Medium', exact: true }),
    ).toBeVisible();
    await expect(
      savedRecordRow.getByRole('cell', { name: 'Yes', exact: true }),
    ).toBeVisible();
  });
});
