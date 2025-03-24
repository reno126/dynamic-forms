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
import type { FormDefinition, FormRecord } from '@/lib/types';
import { useMemo } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { formatCell } from '@/lib/utils';
import { useModal } from '@/contexts/ModalContext';

interface RecordsTableProps {
    formDefinition: FormDefinition;
}

export function RecordsTable({ formDefinition }: RecordsTableProps) {
    const { records, deleteRecord } = useRecords();
    const { showModal } = useModal();

    const handleEdit = (record: FormRecord) => {
        showModal('addOrUpdateRecord', { formDefinition, record });
    };

    const handleDelete = (record: FormRecord) => {
        showModal('confirm', {
            title: 'Are you sure?',
            description: 'This action cannot be undone. This will permanently delete the record.',
            onConfirm: () => deleteRecord(record.id),
        });
    };

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
                            <DropdownMenuItem onClick={() => handleEdit(record)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleDelete(record)}
                                className="text-red-600"
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        ));
    }, [records, formDefinition.fields, deleteRecord]);

    return (
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
    );
} 