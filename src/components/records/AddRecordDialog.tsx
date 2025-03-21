'use client';

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
import type { FormDefinition, FormRecordData } from '@/lib/types';
import { DynamicFieldRenderer } from '../forms/DynamicFieldRenderer';
import { log } from 'console';

interface AddRecordDialogProps {
    isOpen: boolean;
    onClose: () => void;
    formDefinition: FormDefinition;
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
                            <DynamicFieldRenderer field={field} control={control} errors={errors} />
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