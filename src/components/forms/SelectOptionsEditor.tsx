'use client';

import { Control, FieldErrors, UseFormRegister, useFieldArray } from "react-hook-form";
import { CreateFormValues } from "@/lib/types";
import { Button } from "@/lib/ui/button";
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
import { PlusIcon, TrashIcon } from "lucide-react";

type SelectOptionsEditorProps = {
    fieldIndex: number;
    control: Control<CreateFormValues>;
    register: UseFormRegister<CreateFormValues>;
    errors: FieldErrors<CreateFormValues>;
};

export function SelectOptionsEditor({ fieldIndex, control, register, errors }: SelectOptionsEditorProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `fields.${fieldIndex}.options`,
    });

    return (
        <div className="space-y-2 rounded-md border p-3 sm:p-4">
            <Label>Options</Label>
            {fields.map((option, optionIndex) => (
                <div key={option.id} className="flex min-w-0 flex-wrap items-center gap-2">
                    <Input
                        className="min-w-0 flex-1"
                        {...register(`fields.${fieldIndex}.options.${optionIndex}.value`, {
                            required: 'Option value cannot be empty',
                        })}
                        placeholder="Option value"
                        aria-label={`Option ${optionIndex + 1}`}
                        data-testid={`select-option-input-${optionIndex}`}
                    />
                    {errors.fields?.[fieldIndex]?.options?.[optionIndex]?.value && (
                        <p className="w-full text-sm text-red-500">
                            {errors.fields[fieldIndex]?.options?.[optionIndex]?.value?.message}
                        </p>
                    )}
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(optionIndex)}
                    >
                        <TrashIcon className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ value: '' })}
                data-testid="add-select-option-button"
            >
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Option
            </Button>
        </div>
    );
}
