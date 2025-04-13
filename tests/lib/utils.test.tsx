import React from 'react';
import { render, screen } from '@testing-library/react';
import { formatCell } from '@/lib/utils';
import { FormField } from '@/lib/types';

// Mock the Badge component to ensure it has a test id
jest.mock('@/lib/ui/badge', () => ({
    Badge: ({ children, ...props }: { children: React.ReactNode }) => (
        <div data-testid="badge" {...props}>
            {children}
        </div>
    ),
}));

describe('formatCell', () => {
    it('should format a Date object to a locale date string', () => {
        const date = new Date(2023, 10, 25); // Month is 0-indexed, so 10 is November
        const field = { type: 'date' } as FormField;
        expect(formatCell(date, field)).toBe(date.toLocaleDateString());
    });

    it('should return "Yes" for true and "No" for false boolean values', () => {
        const field = { type: 'checkbox' } as FormField;
        expect(formatCell(true, field)).toBe('Yes');
        expect(formatCell(false, field)).toBe('No');
    });

    it('should return "N/A" for null or undefined values', () => {
        const field = { type: 'text' } as FormField;
        expect(formatCell(null, field)).toBe('N/A');
        expect(formatCell(undefined, field)).toBe('N/A');
    });

    it('should return a string representation for other data types', () => {
        const field = { type: 'text' } as FormField;
        expect(formatCell('Hello', field)).toBe('Hello');
        expect(formatCell(123, field)).toBe('123');
    });

    it('should render badges for multi-select array values', () => {
        const data = ['Option 1', 'Option 2'];
        const field = { isMultiSelect: true } as FormField;
        const result = formatCell(data, field);
        render(<>{result}</>);

        const badges = screen.getAllByTestId('badge');
        expect(badges).toHaveLength(2);
        expect(badges[0]).toHaveTextContent('Option 1');
        expect(badges[1]).toHaveTextContent('Option 2');
    });

    it('should handle an empty array for multi-select', () => {
        const data: string[] = [];
        const field = { isMultiSelect: true } as FormField;
        const result = formatCell(data, field);
        render(<>{result}</>);
        expect(screen.queryAllByTestId('badge')).toHaveLength(0);
    });
}); 