'use client';

import React from 'react';
import { Control, Controller, FieldValues, Path, ControllerRenderProps, PathValue } from 'react-hook-form';
import { Label } from '@/components/ui/label';

interface FormFieldControllerProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label: string;
    required?: boolean;
    rules?: object;
    defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
    children: (field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>) => React.ReactNode;
    className?: string;
}

export function FormFieldController<TFieldValues extends FieldValues>({
    control,
    name,
    label,
    required,
    rules,
    defaultValue,
    children,
    className,
}: FormFieldControllerProps<TFieldValues>) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className={className}>
                    <Label htmlFor={field.name}>
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <div className="mt-1">{children(field)}</div>
                    {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
                </div>
            )}
        />
    );
} 