import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { CreateFormValues } from '@/lib/types';
import CreateFormPage from '@/app/forms/new/page';

const mockAddForm = jest.fn<Promise<string>, [CreateFormValues]>();
const mockRouterPush = jest.fn();

jest.mock('@/contexts/FormDefinitionsContext', () => ({
    useFormDefinitions: () => ({ addForm: mockAddForm }),
}));

jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockRouterPush }),
}));

function renderCreateFormPage() {
    const user = userEvent.setup();
    render(<CreateFormPage />);

    return { user };
}

describe('CreateFormPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockAddForm.mockResolvedValue('created-form-id');
    });

    it('builds and submits a form with dynamic fields and select options', async () => {
        const { user } = renderCreateFormPage();

        await user.type(screen.getByRole('textbox', { name: 'Form Name' }), 'Employee Intake');
        await user.type(screen.getByRole('textbox', { name: 'Description' }), 'Employee details');

        await user.click(screen.getByRole('button', { name: 'Add Field' }));
        expect(screen.getByRole('group', { name: 'Field 2' })).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Remove field 2' }));
        expect(screen.queryByRole('group', { name: 'Field 2' })).not.toBeInTheDocument();

        const firstField = screen.getByRole('group', { name: 'Field 1' });
        await user.type(within(firstField).getByRole('textbox', { name: 'Field label' }), 'Department');
        await user.click(within(firstField).getByRole('combobox', { name: 'Field type' }));
        await user.click(screen.getByRole('option', { name: 'select' }));

        await user.click(within(firstField).getByRole('button', { name: 'Add Option' }));
        await user.type(within(firstField).getByRole('textbox', { name: 'Option 1' }), 'Finance');
        await user.click(screen.getByRole('button', { name: 'Create Form' }));

        expect(mockAddForm).toHaveBeenCalledWith({
            name: 'Employee Intake',
            description: 'Employee details',
            fields: [
                expect.objectContaining({
                    label: 'Department',
                    type: 'select',
                    options: [{ value: 'Finance' }],
                }),
            ],
        });
        expect(mockRouterPush).toHaveBeenCalledWith('/forms/created-form-id');
    });

    it('marks required fields invalid and prevents submission when they are blank', async () => {
        const { user } = renderCreateFormPage();

        await user.click(screen.getByRole('button', { name: 'Create Form' }));

        const formNameInput = screen.getByRole('textbox', { name: 'Form Name' });
        const fieldLabelInput = screen.getByRole('textbox', { name: 'Field label' });

        expect(formNameInput).toBeInvalid();
        expect(formNameInput).toHaveAccessibleErrorMessage();
        expect(fieldLabelInput).toBeInvalid();
        expect(fieldLabelInput).toHaveAccessibleErrorMessage();
        expect(mockAddForm).not.toHaveBeenCalled();
    });
});
