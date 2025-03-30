'use client';

import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface CheckboxFieldControllerProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label: string;
    rules?: object;
    className?: string;
}

export function CheckboxFieldController<TFieldValues extends FieldValues>({
    control,
    name,
    label,
    rules,
    className,
}: CheckboxFieldControllerProps<TFieldValues>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className={`items-top flex space-x-2 ${className}`}>
                    <Checkbox
                        id={field.name}
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5"
                    />
                    <div className="grid gap-1.5 leading-none">
                        <Label htmlFor={field.name}>{label}</Label>
                        {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
                    </div>
                </div>
            )}
        />
    );
} 