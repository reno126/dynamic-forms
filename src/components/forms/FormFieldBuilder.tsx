'use client';

import { Control, Controller, FieldErrors, UseFormRegister, useWatch } from "react-hook-form";
import { Button } from "@/lib/ui/button";
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/lib/ui/select";
import { Checkbox } from "@/lib/ui/checkbox";
import { CreateFormValues } from "@/lib/types";
import { FORM_FIELD_TYPES } from "@/constants/forms";
import { TrashIcon } from "lucide-react";
import { SelectOptionsEditor } from "./SelectOptionsEditor";

type FormFieldBuilderProps = {
    index: number;
    control: Control<CreateFormValues>;
    register: UseFormRegister<CreateFormValues>;
    remove: (index: number) => void;
    errors: FieldErrors<CreateFormValues>;
};

export function FormFieldBuilder({ index, control, register, remove, errors }: FormFieldBuilderProps) {
    const type = useWatch({
        control,
        name: `fields.${index}.type`,
    });

    const isSelect = type === 'select';

    return (
        <div
            role="group"
            aria-label={`Field ${index + 1}`}
            className="rounded-md border bg-gray-50 p-3 sm:p-4 form-field-builder-item"
            data-testid={`form-field-builder-item-${index}`}
        >
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="flex-1 space-y-1">
                    <Label htmlFor={`fields.${index}.label`} className="sr-only">
                        Field label
                    </Label>
                    <Input
                        placeholder="Field Label (e.g., First Name)"
                        id={`fields.${index}.label`}
                        aria-invalid={Boolean(errors.fields?.[index]?.label)}
                        aria-describedby={errors.fields?.[index]?.label ? `fields.${index}.label-error` : undefined}
                        aria-errormessage={errors.fields?.[index]?.label ? `fields.${index}.label-error` : undefined}
                        data-testid="field-label-input"
                        {...register(`fields.${index}.label`, {
                            required: 'Label is required',
                        })}
                    />
                    {errors.fields?.[index]?.label && (
                        <p id={`fields.${index}.label-error`} className="text-sm text-red-500">{errors.fields[index]?.label?.message}</p>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0">
                        <Controller
                            control={control}
                            name={`fields.${index}.type`}
                            render={({ field: controllerField }) => (
                                <Select
                                    onValueChange={controllerField.onChange}
                                    value={controllerField.value}
                                >
                                    <SelectTrigger aria-label="Field type" className="w-[120px]" data-testid="field-type-select">
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {FORM_FIELD_TYPES.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    <div className="flex h-10 items-center space-x-2">
                        <Controller
                            control={control}
                            name={`fields.${index}.isRequired`}
                            render={({ field }) => (
                                <Checkbox
                                    id={`fields.${index}.isRequired`}
                                    data-testid="field-required-checkbox"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                        <Label htmlFor={`fields.${index}.isRequired`}>Required</Label>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => remove(index)}
                        aria-label={`Remove field ${index + 1}`}
                        className="flex-shrink-0"
                        data-testid="remove-field-button"
                    >
                        <TrashIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            {isSelect && (
                <div className="mt-4 space-y-4">
                    <div className="flex items-center space-x-2">
                        <Controller
                            control={control}
                            name={`fields.${index}.isMultiSelect`}
                            render={({ field }) => (
                                <Checkbox
                                    id={`fields.${index}.isMultiSelect`}
                                    data-testid="field-multiselect-checkbox"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                        <Label htmlFor={`fields.${index}.isMultiSelect`}>
                            Allow multiple selections
                        </Label>
                    </div>
                    <SelectOptionsEditor fieldIndex={index} control={control} register={register} errors={errors} />
                </div>
            )}
        </div>
    );
}
