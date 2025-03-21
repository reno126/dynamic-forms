'use client';

import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormField, FormRecordData } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect, MultiSelectTrigger, MultiSelectContent } from "@/components/ui/multi-select";

interface DynamicFieldRendererProps {
    field: FormField;
    control: Control<FormRecordData>;
    errors: FieldErrors<FormRecordData>;
}

export function DynamicFieldRenderer({ field, control, errors }: DynamicFieldRendererProps) {
    const fieldName = field.name as keyof FormRecordData;
    const error = errors[fieldName];

    const rules = field.isRequired ? { required: `${field.label} is required.` } : {};
    const isCheckbox = field.type === 'checkbox';

    const getDefaultValue = () => {
        if (isCheckbox) {
            return false;
        }
        if (field.isMultiSelect) {
            return [];
        }
        return '';
    };

    return (
        <>
            {!isCheckbox && <Label htmlFor={field.name}>{field.label}{field.isRequired && '*'}</Label>}
            <Controller
                name={fieldName}
                control={control}
                defaultValue={getDefaultValue()}
                rules={rules}
                render={({ field: controllerField }) => {
                    switch (field.type) {
                        case 'text':
                            return <Input id={field.name} {...controllerField} value={(controllerField.value as string) || ''} />;
                        case 'number':
                            return <Input id={field.name} type="number" {...controllerField} value={(controllerField.value as number) || ''} />;
                        case 'date':
                            return <Input id={field.name} type="date" {...controllerField} value={(controllerField.value as string) || ''} />;
                        case 'checkbox':
                            return (
                                <div className="flex items-center space-x-2 h-10">
                                    <Checkbox
                                        id={field.name}
                                        checked={!!controllerField.value}
                                        onCheckedChange={controllerField.onChange}
                                    />
                                    <Label htmlFor={field.name}>{field.label}</Label>
                                </div>
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
                                <Select
                                    onValueChange={controllerField.onChange}
                                    value={controllerField.value as string | undefined}
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
                            return <></>;
                    }
                }}
            />
            {error && <p className="text-sm text-red-500">{error.message as string}</p>}
        </>
    );
} 