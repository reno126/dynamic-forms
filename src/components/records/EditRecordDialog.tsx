'use client';

import React, { useEffect } from 'react';
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
import type { FormDefinition, FormRecordData, FormField, FormRecord } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { MultiSelect, MultiSelectTrigger, MultiSelectContent } from '../ui/multi-select';

interface EditRecordDialogProps {
    isOpen: boolean;
    onClose: () => void;
    formDefinition: FormDefinition;
    record: FormRecord | null;
}

function renderField(field: FormField, control: any, errors: any) {
    const fieldName = field.name as keyof FormRecordData;
    const error = errors[fieldName];
    const isCheckbox = field.type === 'checkbox';

    const rules = field.isRequired ? { required: `${field.label} is required.` } : {};

    return (
        <>
            {!isCheckbox && <Label htmlFor={field.name}>{field.label}{field.isRequired && '*'}</Label>}
            <Controller
                name={fieldName}
                control={control}
                defaultValue={isCheckbox ? false : field.isMultiSelect ? [] : ''}
                rules={rules}
                render={({ field: controllerField }) => {
                    switch (field.type) {
                        case 'text':
                            return <Input id={field.name} {...controllerField} value={controllerField.value || ''} />;
                        case 'number':
                            return <Input id={field.name} type="number" {...controllerField} value={controllerField.value || ''} />;
                        case 'date':
                            return <Input id={field.name} type="date" {...controllerField} value={controllerField.value || ''} />;
                        case 'checkbox':
                            return (
                                <div className="flex items-center space-x-2 h-10">
                                    <Checkbox
                                        id={field.name}
                                        checked={controllerField.value}
                                        onCheckedChange={controllerField.onChange}
                                    />
                                    <Label htmlFor={field.name}>{field.label}</Label>
                                </div>
                            );
                        case 'select':
                            if (field.isMultiSelect) {
                                return (
                                    <MultiSelect
                                        value={controllerField.value || []}
                                        onValueChange={controllerField.onChange}
                                        options={
                                            field.options?.map((opt) => ({
                                                value: opt.value,
                                                label: opt.value,
                                            })) || []
                                        }
                                        placeholder="Select options..."
                                    >
                                        <MultiSelectTrigger className="w-full" />
                                        <MultiSelectContent />
                                    </MultiSelect>
                                );
                            }
                            return (
                                <Select
                                    onValueChange={controllerField.onChange}
                                    value={controllerField.value}
                                >
                                    <SelectTrigger id={field.name}>
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {(field.options || []).map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.value}
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

export function EditRecordDialog({
    isOpen,
    onClose,
    formDefinition,
    record,
}: EditRecordDialogProps) {
    const { updateRecord } = useRecords();
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<FormRecordData>();

    useEffect(() => {
        if (record) {
            reset(record.data);
        }
    }, [record, reset]);

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = async (data: FormRecordData) => {
        if (!record) return;
        await updateRecord({ ...record, data });
        handleClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Record in {formDefinition.name}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {formDefinition.fields.map((field) => (
                        <div key={field.name}>
                            {renderField(field, control, errors)}
                        </div>
                    ))}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 