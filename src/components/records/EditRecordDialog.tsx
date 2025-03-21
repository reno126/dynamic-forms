'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRecords } from '@/contexts/RecordsContext';
import type { FormDefinition, FormRecordData, FormRecord } from '@/lib/types';
import { DynamicFieldRenderer } from '../forms/DynamicFieldRenderer';

interface EditRecordDialogProps {
    isOpen: boolean;
    onClose: () => void;
    formDefinition: FormDefinition;
    record: FormRecord | null;
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
                        <div key={field.id}>
                            <DynamicFieldRenderer field={field} control={control} errors={errors} />
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