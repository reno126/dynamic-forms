'use client';

import { Control, Controller, FieldErrors, UseFormRegister, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
        <div className="rounded-md border bg-gray-50 p-4">
            <div className="flex items-start space-x-2">
                <div className="flex-1 space-y-1">
                    <Label htmlFor={`fields.${index}.label`} className="sr-only">
                        Label
                    </Label>
                    <Input
                        placeholder="Field Label (e.g., First Name)"
                        {...register(`fields.${index}.label`, {
                            required: 'Label is required',
                        })}
                    />
                    {errors.fields?.[index]?.label && (
                        <p className="text-sm text-red-500">{errors.fields[index]?.label?.message}</p>
                    )}
                </div>
                <div className="flex-shrink-0">
                    <Controller
                        control={control}
                        name={`fields.${index}.type`}
                        render={({ field: controllerField }) => (
                            <Select
                                onValueChange={controllerField.onChange}
                                value={controllerField.value}
                            >
                                <SelectTrigger className="w-[120px]">
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
                <div className="flex h-10 items-center space-x-2 self-end">
                    <Controller
                        control={control}
                        name={`fields.${index}.isRequired`}
                        render={({ field }) => (
                            <Checkbox
                                id={`fields.${index}.isRequired`}
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
                    className="flex-shrink-0 mt-auto"
                >
                    <TrashIcon className="h-4 w-4" />
                </Button>
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