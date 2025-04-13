'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@/lib/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/lib/ui/alert-dialog';
import { Button } from '@/lib/ui/button';
import { useModal } from '@/contexts/ModalContext';

interface ConfirmDialogProps {
    title: string;
    description: string;
    onConfirm: () => void;
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
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
} 