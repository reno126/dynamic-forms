'use client';

import React, { useCallback } from 'react';
import { useRecords, useRecordActions } from '@/contexts/RecordsContext';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/lib/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/ui/card';
import type { FormDefinition, FormRecord } from '@/lib/types';
import { formatCell } from '@/lib/utils';
import { useModal } from '@/contexts/ModalContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/lib/ui/dropdown-menu';
import { Button } from '@/lib/ui/button';
import { MoreHorizontal } from 'lucide-react';

interface RecordsTableProps {
    formDefinition: FormDefinition;
}

export function RecordsTable({ formDefinition }: RecordsTableProps) {
    const { records } = useRecords();
    const { deleteRecord } = useRecordActions();
    const { showModal } = useModal();

    const handleEdit = useCallback((record: FormRecord) => {
        showModal('addOrUpdateRecord', { formDefinition, record });
    }, [showModal, formDefinition]);

    const handleDelete = useCallback((record: FormRecord) => {
        showModal('confirm', {
            title: 'Are you sure?',
            description: 'This action cannot be undone. This will permanently delete the record.',
            onConfirm: () => deleteRecord(record.id),
        });
    }, [showModal, deleteRecord]);

    const renderActionsMenu = (record: FormRecord) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEdit(record)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(record)} className="text-red-600">
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    if (!records || records.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8">
                No records yet.
            </div>
        );
    }

    return (
        <div>
            {/* Desktop View: Table */}
            <div className="hidden md:block border-b border-gray-200 sm:rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {formDefinition.fields.map((field) => (
                                <TableHead key={field.name}>{field.label}</TableHead>
                            ))}
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {records.map((record) => (
                            <TableRow key={record.id}>
                                {formDefinition.fields.map((field) => (
                                    <TableCell key={`${record.id}-${field.name}`}>
                                        {formatCell(record.data[field.name], field)}
                                    </TableCell>
                                ))}
                                <TableCell className="text-right">
                                    {renderActionsMenu(record)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="md:hidden space-y-4">
                {records.map((record) => (
                    <Card key={record.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            </CardTitle>
                            {renderActionsMenu(record)}
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {formDefinition.fields.map((field) => (
                                    <div key={field.name} className="flex justify-between">
                                        <span className="font-semibold text-sm">{field.label}</span>
                                        <span className="text-sm text-gray-600">
                                            {formatCell(record.data[field.name], field)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
} 