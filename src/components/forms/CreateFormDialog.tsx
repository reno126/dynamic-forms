'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
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
import { TrashIcon, PlusIcon } from 'lucide-react';
import { useFormDefinitions } from '@/contexts/FormDefinitionsContext';
import { FormFieldType } from '@/lib/types';

const formFieldSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    label: z.string().min(1, 'Label is required'),
    type: z.nativeEnum(FormFieldType),
});

const createFormSchema = z.object({
    name: z.string().min(1, 'Form name is required'),
    description: z.string().optional(),
    fields: z.array(formFieldSchema).min(1, 'At least one field is required'),
});

type CreateFormValues = z.infer<typeof createFormSchema>;

interface CreateFormDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const fieldTypes: FormFieldType[] = [
    'text',
    'number',
    'date',
    'select',
    'checkbox',
];

export function CreateFormDialog({ isOpen, onClose }: CreateFormDialogProps) {
    const { addForm } = useFormDefinitions();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<CreateFormValues>({
        resolver: zodResolver(createFormSchema),
        defaultValues: {
            name: '',
            description: '',
            fields: [{ name: '', label: '', type: 'text' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'fields',
    });

    const onSubmit = async (data: CreateFormValues) => {
        // TODO: Connect this to the context
        console.log(data);
        // await addForm(data);
        // reset();
        // onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Create New Form</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Form Name</Label>
                        <Input id="name" {...register('name')} />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" {...register('description')} />
                    </div>

                    <div className="space-y-4">
                        <Label>Fields</Label>
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-end space-x-2">
                                <div className="flex-1">
                                    <Label htmlFor={`fields.${index}.name`} className="sr-only">
                                        Name
                                    </Label>
                                    <Input
                                        placeholder="Field Name (e.g., firstName)"
                                        {...register(`fields.${index}.name`)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor={`fields.${index}.label`} className="sr-only">
                                        Label
                                    </Label>
                                    <Input
                                        placeholder="Field Label (e.g., First Name)"
                                        {...register(`fields.${index}.label`)}
                                    />
                                </div>
                                <div>
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
                                                    {fieldTypes.map((type) => (
                                                        <SelectItem key={type} value={type}>
                                                            {type}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => remove(index)}
                                    disabled={fields.length <= 1}
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        {errors.fields && (
                            <p className="text-sm text-red-500">{errors.fields.message}</p>
                        )}
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ name: '', label: '', type: 'text' })}
                    >
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Add Field
                    </Button>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Create Form</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 