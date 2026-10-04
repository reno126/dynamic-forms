'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/lib/ui/button';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/lib/ui/alert-dialog';

interface ConfirmDialogProps {
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
    onClose: () => void;
    isOpen: boolean;
}

export function ConfirmDialog({
    isOpen,
    title,
    description,
    onConfirm,
    onClose,
}: ConfirmDialogProps) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleConfirm = () => {
        setErrorMessage(null);
        startTransition(async () => {
            try {
                await onConfirm();
                onClose();
            } catch {
                setErrorMessage('The action could not be completed. Please try again.');
            }
        });
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                    {errorMessage && <p role="alert" className="text-sm text-red-500">{errorMessage}</p>}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <Button onClick={handleConfirm} disabled={isPending}>
                        {isPending ? 'Working...' : 'Continue'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
