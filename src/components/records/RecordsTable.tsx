'use client';

import { useRecords } from '@/contexts/RecordsContext';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { FormDefinition, FormRecord, FormRecordData } from '@/lib/types';
import { useMemo, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { EditRecordDialog } from './EditRecordDialog';
import { Badge } from '@/components/ui/badge';

interface RecordsTableProps {
    formDefinition: FormDefinition;
}

function formatCell(data: FormRecordData[string], field: FormDefinition['fields'][0]): React.ReactNode {
    if (field.isMultiSelect && Array.isArray(data)) {
        return (
            <div className="flex flex-wrap gap-1">
                {data.map((item) => (
                    <Badge key={item} variant="secondary">
                        {item}
                    </Badge>
                ))}
            </div>
        );
    }

    if (data instanceof Date) {
        return data.toLocaleDateString();
    }
    if (typeof data === 'boolean') {
        return data ? 'Yes' : 'No';
    }
    if (data === null || data === undefined) {
        return 'N/A';
    }
    return String(data);
}

export function RecordsTable({ formDefinition }: RecordsTableProps) {
    const { records, deleteRecord } = useRecords();
    const [recordToEdit, setRecordToEdit] = useState<FormRecord | null>(null);
    const [recordToDelete, setRecordToDelete] = useState<FormRecord | null>(null);

    const tableHeaders = useMemo(() => {
        return formDefinition.fields.map((field) => (
            <TableHead key={field.name}>{field.label}</TableHead>
        ));
    }, [formDefinition.fields]);

    const tableRows = useMemo(() => {
        if (!records) return null;

        return records.map((record) => (
            <TableRow key={record.id}>
                {formDefinition.fields.map((field) => (
                    <TableCell key={`${record.id}-${field.name}`}>
                        {formatCell(record.data[field.name], field)}
                    </TableCell>
                ))}
                <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setRecordToEdit(record)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setRecordToDelete(record)}
                                className="text-red-600"
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        ));
    }, [records, formDefinition.fields]);

    const handleDeleteConfirm = () => {
        if (recordToDelete) {
            deleteRecord(recordToDelete.id);
            setRecordToDelete(null);
        }
    };

    return (
        <>
            <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {tableHeaders}
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {records && records.length > 0 ? (
                            tableRows
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={formDefinition.fields.length + 1}
                                    className="text-center"
                                >
                                    No records yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <EditRecordDialog
                isOpen={!!recordToEdit}
                onClose={() => setRecordToEdit(null)}
                formDefinition={formDefinition}
                record={recordToEdit}
            />
            <AlertDialog
                open={!!recordToDelete}
                onOpenChange={() => setRecordToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            record.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
} 