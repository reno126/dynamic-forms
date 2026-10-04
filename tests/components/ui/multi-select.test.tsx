import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    MultiSelect,
    MultiSelectTrigger,
    MultiSelectContent,
} from '@/components/ui/MultiSelect';

interface MultiSelectHarnessProps {
    value: string[];
    onValueChange: (nextValues: string[]) => void;
    placeholder?: string;
}

const frameworkOptions = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
];

function MultiSelectHarness({ value, onValueChange, placeholder }: MultiSelectHarnessProps) {
    return (
        <MultiSelect options={frameworkOptions} value={value} onValueChange={onValueChange} placeholder={placeholder}>
            <MultiSelectTrigger aria-label="Frameworks" />
            <MultiSelectContent />
        </MultiSelect>
    );
}

function renderMultiSelect(value: string[], onValueChange: (nextValues: string[]) => void = () => undefined) {
    const user = userEvent.setup();
    render(<MultiSelectHarness value={value} onValueChange={onValueChange} placeholder="Select a framework..." />);

    const trigger = screen.getByRole('button', { name: 'Frameworks' });

    return {
        user,
        trigger,
        async openOptions() {
            await user.click(trigger);
            return screen.getByRole('listbox');
        },
    };
}

describe('MultiSelect', () => {
    it('renders its placeholder when no value is selected', () => {
        renderMultiSelect([]);

        expect(screen.getByText('Select a framework...')).toBeInTheDocument();
    });

    it('displays selected values', () => {
        const { trigger } = renderMultiSelect(['react', 'vue']);

        expect(within(trigger).getByText('React')).toBeInTheDocument();
        expect(within(trigger).getByText('Vue')).toBeInTheDocument();
    });

    it('shows available options after opening the trigger', async () => {
        const { openOptions } = renderMultiSelect([]);
        const optionList = await openOptions();

        expect(within(optionList).getByText('React')).toBeInTheDocument();
        expect(within(optionList).getByText('Vue')).toBeInTheDocument();
        expect(within(optionList).getByText('Svelte')).toBeInTheDocument();
    });

    it('reports the selected value when an option is chosen', async () => {
        const onValueChange = jest.fn();
        const { openOptions, user } = renderMultiSelect(['react'], onValueChange);
        const optionList = await openOptions();

        await user.click(within(optionList).getByText('Vue'));

        expect(onValueChange).toHaveBeenCalledWith(['react', 'vue']);
    });

    it('reports the updated value when an option is deselected', async () => {
        const onValueChange = jest.fn();
        const { openOptions, user } = renderMultiSelect(['react', 'vue'], onValueChange);
        const optionList = await openOptions();

        await user.click(within(optionList).getByText('Vue'));

        expect(onValueChange).toHaveBeenCalledWith(['react']);
    });

    it('allows a selected value to be removed by its accessible control name', async () => {
        const onValueChange = jest.fn();
        const { user } = renderMultiSelect(['react', 'vue'], onValueChange);

        await user.click(screen.getByRole('button', { name: 'Remove React' }));

        expect(onValueChange).toHaveBeenCalledWith(['vue']);
    });
});
