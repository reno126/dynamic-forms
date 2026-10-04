import React from 'react';
import { render, screen } from '@testing-library/react';
import { formatCell } from '@/lib/utils';
import type { FormField } from '@/lib/types';

function createFormField(overrides: Partial<FormField> = {}): FormField {
    return {
        id: 'field-id',
        name: 'field_name',
        label: 'Field label',
        type: 'text',
        ...overrides,
    };
}

describe('formatCell', () => {
    it('formats a Date object as a locale date string', () => {
        const dateValue = new Date(2023, 10, 25);

        expect(formatCell(dateValue, createFormField({ type: 'date' }))).toBe(dateValue.toLocaleDateString());
    });

    it('formats boolean values as Yes or No', () => {
        const checkboxField = createFormField({ type: 'checkbox' });

        expect(formatCell(true, checkboxField)).toBe('Yes');
        expect(formatCell(false, checkboxField)).toBe('No');
    });

    it('formats null and undefined values as unavailable', () => {
        const textField = createFormField();

        expect(formatCell(null, textField)).toBe('N/A');
        expect(formatCell(undefined, textField)).toBe('N/A');
    });

    it('returns string representations for other scalar values', () => {
        const textField = createFormField();

        expect(formatCell('Hello', textField)).toBe('Hello');
        expect(formatCell(123, textField)).toBe('123');
    });

    it('renders each selected multi-select value', () => {
        render(<>{formatCell(['Option 1', 'Option 2'], createFormField({ isMultiSelect: true }))}</>);

        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('renders no values for an empty multi-select array', () => {
        render(<>{formatCell([], createFormField({ isMultiSelect: true }))}</>);

        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });
});
