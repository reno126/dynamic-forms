'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusIcon, ArrowLeft } from 'lucide-react';
import { useFormDefinitions } from '@/contexts/FormDefinitionsContext';
import { CreateFormValues, FormBuilderField } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { nanoid } from 'nanoid';
import { FormFieldBuilder } from '@/components/forms/FormFieldBuilder';

export default function CreateFormPage() {
    const router = useRouter();
    const { addForm } = useFormDefinitions();
    const emptyDefaultField: FormBuilderField = { name: `field_${nanoid(6)}`, label: '', type: 'text', isRequired: false, options: [], isMultiSelect: false };
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<CreateFormValues>({
        defaultValues: {
            name: '',
            description: '',
            fields: [emptyDefaultField],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'fields',
    });

    const onSubmit = async (data: CreateFormValues) => {
        await addForm(data);
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

                        <div className="space-y-2">
                            <Label>Fields</Label>
                            {fields.map((field, index) => (
                                <FormFieldBuilder
                                    key={field.id}
                                    index={index}
                                    control={control}
                                    register={register}
                                    remove={() => remove(index)}
                                    errors={errors}
                                />
                            ))}
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => append(emptyDefaultField)}
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