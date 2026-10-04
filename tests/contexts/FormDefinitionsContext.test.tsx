import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  FormDefinitionsProvider,
  useFormDefinitions,
} from '@/contexts/FormDefinitionsContext';

const mockDeleteFormDefinition = jest.fn<Promise<void>, [string]>();
const mockDeleteFormRecords = jest.fn<Promise<number>, []>();

jest.mock('dexie-react-hooks', () => ({ useLiveQuery: () => [] }));
jest.mock('@/lib/db', () => ({
  db: {
    formDefinitions: { delete: mockDeleteFormDefinition },
    formRecords: {
      where: () => ({ equals: () => ({ delete: mockDeleteFormRecords }) }),
    },
    delete: jest.fn(),
    open: jest.fn(),
  },
}));

function DeleteFormControl() {
  const { deleteForm } = useFormDefinitions();
  return (
    <button onClick={() => deleteForm('employee-form')}>Delete form</button>
  );
}

describe('FormDefinitionsProvider data lifecycle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDeleteFormDefinition.mockResolvedValue();
    mockDeleteFormRecords.mockResolvedValue(2);
  });

  it('deletes a form and its associated records', async () => {
    const user = userEvent.setup();
    render(
      <FormDefinitionsProvider>
        <DeleteFormControl />
      </FormDefinitionsProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Delete form' }));

    expect(mockDeleteFormDefinition).toHaveBeenCalledWith('employee-form');
    expect(mockDeleteFormRecords).toHaveBeenCalledTimes(1);
  });
});
