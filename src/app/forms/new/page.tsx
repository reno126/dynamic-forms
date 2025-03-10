'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { TrashIcon, PlusIcon, ArrowLeft } from 'lucide-react';
import { useFormDefinitions } from '@/contexts/FormDefinitionsContext';
import { FORM_FIELD_TYPES, type FormFieldType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { nanoid } from 'nanoid';

type CreateFormValues = {
    name: string;
    description?: string;
    fields: {
        name: string;
        label: string;
        type: FormFieldType;
        isRequired?: boolean;
        options?: { value: string }[];
    }[];
};

export default function CreateFormPage() {
    const router = useRouter();
    const { addForm } = useFormDefinitions();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        watch,
        setValue,
    } = useForm<CreateFormValues>({
        defaultValues: {
            name: '',
            description: '',
            fields: [{ name: `field_${nanoid(6)}`, label: '', type: 'text', isRequired: false, options: [] }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'fields',
        rules: {
            minLength: {
                value: 1,
                message: 'At least one field is required.',
            },
        },
    });

    const watchedFields = watch('fields');

    const onSubmit = async (data: CreateFormValues) => {
        const dataToSave = {
            ...data,
            description: data.description || '',
            fields: data.fields.map(field => {
                if (field.type !== 'select') {
                    return { ...field, options: [] };
                }
                return field;
            }),
        };
        await addForm(dataToSave);
        router.push('/forms');
    };

    return (
        <div className="space-y-6">
            <div>
                <Link
                    href="/forms"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to all forms
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Form</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Form Name</Label>
                            <Input
                                id="name"
                                {...register('name', { required: 'Form name is required' })}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" {...register('description')} />
                        </div>

                        <div className="space-y-4">
                            <Label>Fields</Label>
                            {fields.map((field, index) => {
                                const isSelect = watchedFields[index]?.type === 'select';
                                return (
                                    <div key={field.id} className="rounded-md border bg-gray-50 p-4">
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
                                                <Label htmlFor={`fields.${index}.type`} className="sr-only">
                                                    Type
                                                </Label>
                                                <Controller
                                                    control={control}
                                                    name={`fields.${index}.type`}
                                                    render={({ field: controllerField }) => (
                                                        <Select
                                                            onValueChange={(value) => {
                                                                controllerField.onChange(value);
                                                                if (value !== 'select') {
                                                                    setValue(`fields.${index}.options`, []);
                                                                }
                                                            }}
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
                                                disabled={fields.length <= 1}
                                                className="flex-shrink-0 mt-auto"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {isSelect && (
                                            <OptionsEditor fieldIndex={index} control={control} register={register} errors={errors} />
                                        )}
                                    </div>
                                );
                            })}
                            {errors.fields?.root && (
                                <p className="text-sm text-red-500">
                                    {errors.fields.root.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => append({ name: `field_${nanoid(6)}`, label: '', type: 'text', isRequired: false, options: [] })}
                        >
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Field
                        </Button>
                    </CardContent>
                </Card>
                <div className="mt-6 flex justify-end space-x-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.push('/forms')}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Form'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

function OptionsEditor({ fieldIndex, control, register, errors }: { fieldIndex: number; control: any; register: any; errors: any }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `fields.${fieldIndex}.options`,
        rules: {
            minLength: {
                value: 1,
                message: "Select field must have at least one option."
            }
        }
    });

    return (
        <div className="col-span-full w-full space-y-2 pt-4">
            <Label className="text-sm font-medium">Options</Label>
            {fields.map((option, optionIndex) => (
                <div key={option.id} className="flex items-center space-x-2">
                    <Input
                        placeholder={`Option ${optionIndex + 1}`}
                        {...register(`fields.${fieldIndex}.options.${optionIndex}.value`, {
                            required: 'Option value cannot be empty',
                        })}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(optionIndex)}
                        disabled={fields.length <= 1}
                    >
                        <TrashIcon className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            {errors.fields?.[fieldIndex]?.options?.root && (
                <p className="text-sm text-red-500">{errors.fields?.[fieldIndex]?.options?.root?.message}</p>
            )}

            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ value: '' })}
            >
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Option
            </Button>
        </div>
    );
} 