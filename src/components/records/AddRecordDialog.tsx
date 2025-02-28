'use client';

import { useForm, Controller } from 'react-hook-form';
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
import { useRecords } from '@/contexts/RecordsContext';
import type { FormDefinition, FormRecordData, FormField } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';

interface AddRecordDialogProps {
    isOpen: boolean;
    onClose: () => void;
    formDefinition: FormDefinition;
}

function renderField(field: FormField, control: any, errors: any) {
    const fieldName = field.name as keyof FormRecordData;
    const error = errors[fieldName];

    const rules = field.isRequired ? { required: `${field.label} is required.` } : {};

    const isCheckbox = field.type === 'checkbox';

    return (
        <>
            {!isCheckbox && <Label htmlFor={field.id}>{field.label}{field.isRequired && '*'}</Label>}
            <Controller
                name={fieldName}
                control={control}
                defaultValue={isCheckbox ? false : ''}
                rules={rules}
                render={({ field: controllerField }) => {
                    switch (field.type) {
                        case 'text':
                            return <Input id={field.id} {...controllerField} value={controllerField.value || ''} />;
                        case 'number':
                            return <Input id={field.id} type="number" {...controllerField} value={controllerField.value || ''} />;
                        case 'date':
                            return <Input id={field.id} type="date" {...controllerField} value={controllerField.value || ''} />;
                        case 'checkbox':
                            return (
                                <div className="flex items-center space-x-2 h-10">
                                    <Checkbox
                                        id={field.id}
                                        checked={controllerField.value}
                                        onCheckedChange={controllerField.onChange}
                                    />
                                    <Label htmlFor={field.id}>{field.label}</Label>
                                </div>
                            );
                        case 'select':
                            return (
                                <Select
                                    onValueChange={controllerField.onChange}
                                    value={controllerField.value}
                                >
                                    <SelectTrigger id={field.id}>
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {(field.options || []).map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            );
                        default:
                            return <></>;
                    }
                }}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </>
    );
}

export function AddRecordDialog({
    isOpen,
    onClose,
    formDefinition,
}: AddRecordDialogProps) {
    const { addRecord } = useRecords();
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<FormRecordData>();

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = async (data: FormRecordData) => {
        await addRecord(data);
        handleClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Record to {formDefinition.name}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {formDefinition.fields.map((field) => (
                        <div key={field.id}>
                            {renderField(field, control, errors)}
                        </div>
                    ))}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Save Record</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 