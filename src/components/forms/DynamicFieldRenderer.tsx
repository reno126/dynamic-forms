'use client';

import { Control, ControllerRenderProps } from 'react-hook-form';
import { FormField, FormRecordData } from '@/lib/types';
import { Input } from '@/lib/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/ui/select';
import { MultiSelect, MultiSelectTrigger, MultiSelectContent } from '@/components/ui/MultiSelect';
import { FormFieldController } from './FormFieldController';
import { CheckboxFieldController } from './CheckboxFieldController';

interface DynamicFieldRendererProps {
    field: FormField;
    control: Control<FormRecordData>;
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

export function DynamicFieldRenderer({ field, control }: DynamicFieldRendererProps) {
    const fieldName = field.name;
    const rules = field.isRequired ? { required: `${field.label} is required.` } : {};

    if (field.type === 'checkbox') {
        return <CheckboxFieldController control={control} name={fieldName} label={field.label} rules={rules} />;
    }

    const getDefaultValue = () => {
        if (field.isMultiSelect) return [];
        return '';
    };

    const renderField = (controllerField: ControllerRenderProps<FormRecordData, keyof FormRecordData>) => {
        switch (field.type) {
            case 'text':
                return (
                    <Input
                        id={field.name}
                        {...controllerField}
                        value={typeof controllerField.value === 'string' ? controllerField.value : ''}
                    />
                );
            case 'number':
                return (
                    <Input
                        id={field.name}
                        type="number"
                        name={controllerField.name}
                        ref={controllerField.ref}
                        onBlur={controllerField.onBlur}
                        onChange={(changeEvent) => {
                            const nextValue = changeEvent.currentTarget.value;
                            const numericValue = changeEvent.currentTarget.valueAsNumber;
                            controllerField.onChange(
                                nextValue === '' || Number.isNaN(numericValue)
                                    ? null
                                    : numericValue
                            );
                        }}
                        value={
                            typeof controllerField.value === 'number' ||
                            typeof controllerField.value === 'string'
                                ? controllerField.value
                                : ''
                        }
                    />
                );
            case 'date':
                return (
                    <Input
                        id={field.name}
                        type="date"
                        {...controllerField}
                        value={typeof controllerField.value === 'string' ? controllerField.value : ''}
                    />
                );
            case 'select':
                if (field.isMultiSelect) {
                    return (
                        <MultiSelect
                            value={isStringArray(controllerField.value) ? controllerField.value : []}
                            onValueChange={controllerField.onChange}
                            options={
                                field.options?.map((opt) => ({
                                    value: opt.value,
                                    label: opt.value,
                                })) || []
                            }
                            placeholder="Select options..."
                        >
                            <MultiSelectTrigger className="w-full" />
                            <MultiSelectContent />
                        </MultiSelect>
                    );
                }
                return (
                    <Select
                        onValueChange={controllerField.onChange}
                        value={typeof controllerField.value === 'string' ? controllerField.value : undefined}
                    >
                        <SelectTrigger id={field.name}>
                            <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                            {(field.options || []).map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            default:
                return null;
        }
    };

    return (
        <FormFieldController
            control={control}
            name={fieldName}
            label={field.label}
            required={field.isRequired}
            rules={rules}
            defaultValue={getDefaultValue()}
        >
            {(controllerField) => renderField(controllerField)}
        </FormFieldController>
    );
}
