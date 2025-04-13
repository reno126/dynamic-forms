import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    MultiSelect,
    MultiSelectTrigger,
    MultiSelectContent,
} from '@/components/ui/MultiSelect';
import { FORM_FIELD_TYPES } from '@/constants/forms';

jest.mock('@/lib/ui/popover', () => ({
    Popover: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    PopoverTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    PopoverContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('MultiSelect', () => {
    const options = [
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Svelte', value: 'svelte' },
    ];

    const TestMultiSelect = (props: any) => (
        <MultiSelect options={options} {...props}>
            <MultiSelectTrigger />
            <MultiSelectContent />
        </MultiSelect>
    );

    it('should render with a placeholder when no value is selected', () => {
        render(<TestMultiSelect value={[]} onValueChange={() => { }} placeholder="Select a framework..." />);
        expect(screen.getByText('Select a framework...')).toBeInTheDocument();
    });

    it('should display selected values as badges', () => {
        render(<TestMultiSelect value={['react', 'vue']} onValueChange={() => { }} />);
        const trigger = screen.getByRole('button');
        expect(within(trigger).getByText('React')).toBeInTheDocument();
        expect(within(trigger).getByText('Vue')).toBeInTheDocument();
    });

    it('should open the content with options on trigger click', async () => {
        const user = userEvent.setup();
        render(<TestMultiSelect value={[]} onValueChange={() => { }} />);

        const trigger = screen.getByRole('button');
        await user.click(trigger);

        const list = screen.getByRole('listbox');
        expect(within(list).getByText('React')).toBeInTheDocument();
        expect(within(list).getByText('Vue')).toBeInTheDocument();
        expect(within(list).getByText('Svelte')).toBeInTheDocument();
    });

    it('should call onValueChange with the new value when an option is selected', async () => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<TestMultiSelect value={['react']} onValueChange={onValueChange} />);

        await user.click(screen.getByRole('button'));
        const list = screen.getByRole('listbox');
        await user.click(within(list).getByText('Vue'));

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith(['react', 'vue']);
    });

    it('should call onValueChange with the updated value when an option is deselected', async () => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<TestMultiSelect value={['react', 'vue']} onValueChange={onValueChange} />);

        await user.click(screen.getByRole('button'));
        const list = screen.getByRole('listbox');
        await user.click(within(list).getByText('Vue'));

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith(['react']);
    });

    it('should call onValueChange when deselecting via the "X" on a badge', async () => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<TestMultiSelect value={['react', 'vue']} onValueChange={onValueChange} />);

        const trigger = screen.getByRole('button');
        const reactBadge = within(trigger).getByText('React');
        const xCircle = reactBadge.parentElement?.querySelector('svg');

        expect(xCircle).toBeInTheDocument();
        if (xCircle) {
            await user.click(xCircle);
        }

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith(['vue']);
    });
}); 