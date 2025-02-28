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

type CreateFormValues = {
    name: string;
    description?: string;
    fields: {
        name: string;
        label: string;
        type: FormFieldType;
        isRequired?: boolean;
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
        reset,
    } = useForm<CreateFormValues>({
        defaultValues: {
            name: '',
            description: '',
            fields: [{ name: '', label: '', type: 'text', isRequired: false }],
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

    const onSubmit = async (data: CreateFormValues) => {
        const dataToSave = {
            ...data,
            description: data.description || '',
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
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-start space-x-2">
                                    <div className="flex-1 space-y-1">
                                        <Label htmlFor={`fields.${index}.name`} className="sr-only">
                                            Name
                                        </Label>
                                        <Input
                                            placeholder="Field Name (e.g., firstName)"
                                            {...register(`fields.${index}.name`, {
                                                required: 'Name is required',
                                            })}
                                        />
                                        {errors.fields?.[index]?.name && (
                                            <p className="text-sm text-red-500">{errors.fields[index]?.name?.message}</p>
                                        )}
                                    </div>
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
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
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
                            ))}
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
                            onClick={() => append({ name: '', label: '', type: 'text', isRequired: false })}
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