import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddOrUpdateRecordDialog } from '@/components/records/AddOrUpdateRecordDialog';
import type { FormDefinition, FormRecord } from '@/lib/types';

const mockAddRecord = jest.fn<
  Promise<void>,
  [string, Record<string, unknown>]
>();
const mockUpdateRecord = jest.fn<Promise<void>, [FormRecord]>();

jest.mock('@/contexts/RecordsContext', () => ({
  useRecordActions: () => ({
    addRecord: mockAddRecord,
    updateRecord: mockUpdateRecord,
  }),
}));

const formDefinition: FormDefinition = {
  id: 'employee-form',
  name: 'Employee Intake',
  description: '',
  fields: [
    { id: 'name', name: 'name', label: 'Name', type: 'text', isRequired: true },
    { id: 'age', name: 'age', label: 'Age', type: 'number' },
    { id: 'startDate', name: 'startDate', label: 'Start date', type: 'date' },
    { id: 'active', name: 'active', label: 'Active', type: 'checkbox' },
    {
      id: 'department',
      name: 'department',
      label: 'Department',
      type: 'select',
      options: [{ value: 'Engineering' }, { value: 'Operations' }],
    },
    {
      id: 'interests',
      name: 'interests',
      label: 'Interests',
      type: 'select',
      isMultiSelect: true,
      options: [{ value: 'Design' }, { value: 'Research' }],
    },
  ],
};

function renderRecordDialog(record?: FormRecord) {
  const user = userEvent.setup();
  const onClose = jest.fn();
  render(
    <AddOrUpdateRecordDialog
      isOpen
      onClose={onClose}
      formDefinition={formDefinition}
      record={record}
    />,
  );
  return { user, onClose };
}

describe('AddOrUpdateRecordDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAddRecord.mockResolvedValue();
    mockUpdateRecord.mockResolvedValue();
  });

  it('requires required inputs and supports every record field type when adding', async () => {
    const { user, onClose } = renderRecordDialog();
    await user.click(screen.getByRole('button', { name: 'Save Record' }));

    expect(screen.getByRole('textbox', { name: 'Name *' })).toBeInvalid();
    expect(mockAddRecord).not.toHaveBeenCalled();
    await user.type(
      screen.getByRole('textbox', { name: 'Name *' }),
      'Ada Lovelace',
    );
    await user.type(screen.getByRole('spinbutton', { name: 'Age' }), '36');
    await user.type(screen.getByLabelText('Start date'), '2026-10-04');
    await user.click(screen.getByRole('checkbox', { name: 'Active' }));
    await user.click(screen.getByRole('combobox', { name: 'Department' }));
    await user.click(screen.getByRole('option', { name: 'Engineering' }));
    await user.click(screen.getByRole('button', { name: 'Select options...' }));
    await user.click(screen.getByRole('option', { name: 'Design' }));
    await user.click(screen.getByRole('button', { name: 'Save Record' }));

    await waitFor(() =>
      expect(mockAddRecord).toHaveBeenCalledWith(
        'employee-form',
        expect.objectContaining({
          name: 'Ada Lovelace',
          age: 36,
          startDate: '2026-10-04',
          active: true,
          department: 'Engineering',
          interests: ['Design'],
        }),
      ),
    );
    expect(onClose).toHaveBeenCalled();
  });

  it('loads existing values and saves edits while keeping the dialog open on failure', async () => {
    const existingRecord: FormRecord = {
      id: 'record-1',
      formId: formDefinition.id,
      createdAt: new Date('2026-01-01'),
      data: {
        name: 'Grace Hopper',
        age: 40,
        startDate: '2026-01-01',
        active: false,
        department: 'Operations',
        interests: ['Research'],
      },
    };
    mockUpdateRecord.mockRejectedValueOnce(new Error('storage unavailable'));
    const { user, onClose } = renderRecordDialog(existingRecord);

    expect(screen.getByRole('textbox', { name: 'Name *' })).toHaveValue(
      'Grace Hopper',
    );
    await user.clear(screen.getByRole('textbox', { name: 'Name *' }));
    await user.type(
      screen.getByRole('textbox', { name: 'Name *' }),
      'Grace Brewster',
    );
    await user.click(screen.getByRole('button', { name: 'Save Changes' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Could not save the record. Please try again.',
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();

    mockUpdateRecord.mockResolvedValueOnce();
    await user.click(screen.getByRole('button', { name: 'Save Changes' }));
    await waitFor(() =>
      expect(mockUpdateRecord).toHaveBeenLastCalledWith(
        expect.objectContaining({
          id: 'record-1',
          data: expect.objectContaining({ name: 'Grace Brewster' }),
        }),
      ),
    );
    expect(onClose).toHaveBeenCalled();
  });

  it('keeps an add dialog available after a failed save', async () => {
    mockAddRecord.mockRejectedValueOnce(new Error('storage unavailable'));
    const { user, onClose } = renderRecordDialog();
    await user.type(
      screen.getByRole('textbox', { name: 'Name *' }),
      'Ada Lovelace',
    );
    await user.click(screen.getByRole('button', { name: 'Save Record' }));

    expect(await screen.findByRole('alert')).toBeVisible();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });
});
