'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/lib/ui/button';
import { Input } from '@/lib/ui/input';
import { Label } from '@/lib/ui/label';
import { PlusIcon } from 'lucide-react';
import { useFormDefinitions } from '@/contexts/FormDefinitionsContext';
import { CreateFormValues, FormBuilderField } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/ui/card';
import { nanoid } from 'nanoid';
import { FormFieldBuilder } from '@/components/forms/FormFieldBuilder';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BackLinkButton } from '@/components/ui/BackLinkButton';

function createEmptyDefaultField(): FormBuilderField {
    return {
        name: `field_${nanoid()}`,
        label: '',
        type: 'text',
        isRequired: false,
        options: [],
        isMultiSelect: false,
    };
}

export default function CreateFormPage() {
    const router = useRouter();
    const { addForm } = useFormDefinitions();
    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<CreateFormValues>({
        defaultValues: {
            name: '',
            description: '',
            fields: [createEmptyDefaultField()],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'fields',
    });

    const onSubmit = async (data: CreateFormValues) => {
        try {
            const newFormId = await addForm(data);
            router.push(`/forms/${newFormId}`);
        } catch {
            setError('root', {
                type: 'server',
                message: 'Could not create the form. Please try again.',
            });
        }
    };

    return (
        <PageWrapper>
            <BackLinkButton href="/forms" text="Back to all forms" />
            <div className="mx-auto max-w-4xl">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Create a New Form</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {errors.root?.message && (
                        <p role="alert" className="mb-4 text-sm text-red-500">
                            {errors.root.message}
                        </p>
                    )}
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Form</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Form Name</Label>
                                <Input
                                    id="name"
                                    aria-invalid={Boolean(errors.name)}
                                    aria-describedby={errors.name ? 'form-name-error' : undefined}
                                    aria-errormessage={errors.name ? 'form-name-error' : undefined}
                                    data-testid="form-name-input"
                                    {...register('name', { required: 'Form name is required' })}
                                />
                                {errors.name && (
                                    <p id="form-name-error" className="text-sm text-red-500">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    data-testid="form-description-input"
                                    {...register('description')}
                                />
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
                                onClick={() => append(createEmptyDefaultField())}
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
        </PageWrapper>
    );
}
