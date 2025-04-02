'use client';

import { Control, ControllerRenderProps } from 'react-hook-form';
import { FormField, FormRecordData } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MultiSelect, MultiSelectTrigger, MultiSelectContent } from '@/components/ui/multi-select';
import { FormFieldController } from './FormFieldController';
import { CheckboxFieldController } from './CheckboxFieldController';

interface DynamicFieldRendererProps {
    field: FormField;
    control: Control<FormRecordData>;
}

export function DynamicFieldRenderer({ field, control }: DynamicFieldRendererProps) {
    const fieldName = field.name as keyof FormRecordData;
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
                return <Input id={field.name} {...controllerField} value={(controllerField.value as string) || ''} />;
            case 'number':
                return (
                    <Input
                        id={field.name}
                        type="number"
                        {...controllerField}
                        value={(controllerField.value as number) || ''}
                    />
                );
            case 'date':
                return (
                    <Input id={field.name} type="date" {...controllerField} value={(controllerField.value as string) || ''} />
                );
            case 'select':
                if (field.isMultiSelect) {
                    return (
                        <MultiSelect
                            value={(controllerField.value as string[]) || []}
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
                    <Select onValueChange={controllerField.onChange} value={controllerField.value as string | undefined}>
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