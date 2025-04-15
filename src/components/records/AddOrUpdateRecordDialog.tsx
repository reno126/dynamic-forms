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
} from '@/lib/ui/dialog';
import { Button } from '@/lib/ui/button';
import { useRecordActions } from '@/contexts/RecordsContext';
import type { FormDefinition, FormRecordData, FormRecord } from '@/lib/types';
import { DynamicFieldRenderer } from '../forms/DynamicFieldRenderer';

interface AddOrUpdateRecordDialogProps {
    isOpen: boolean;
    onClose: () => void;
    formDefinition: FormDefinition;
    record?: FormRecord | null;
}

export function AddOrUpdateRecordDialog({
    isOpen,
    onClose,
    formDefinition,
    record,
}: AddOrUpdateRecordDialogProps) {
    const { addRecord, updateRecord } = useRecordActions();
    const {
        handleSubmit,
        control,
        reset,
        formState: { isSubmitting },
    } = useForm<FormRecordData>();

    const isEditMode = !!record;

    useEffect(() => {
        if (isEditMode) {
            reset(record.data);
        } else {
            reset({}); // Clear form for adding new record
        }
    }, [record, isEditMode, reset, isOpen]); // isOpen ensures reset on reopen

    const handleClose = () => {
        onClose();
    };

    const onSubmit = async (data: FormRecordData) => {
        if (isEditMode) {
            await updateRecord({ ...record, data });
        } else {
            await addRecord(formDefinition.id, data);
        }
        handleClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent data-testid="add-update-record-dialog">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? 'Edit Record in' : 'Add New Record to'} {formDefinition.name}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {formDefinition.fields.map((field) => (
                        <div key={field.id}>
                            <DynamicFieldRenderer field={field} control={control} />
                        </div>
                    ))}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting} data-testid="save-record-button">
                            {isSubmitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Save Record'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 