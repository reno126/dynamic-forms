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
import type { FormDefinition, FormRecordData } from '@/lib/types';
import { useMemo } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

interface RecordsTableProps {
    formDefinition: FormDefinition;
}

function formatCell(data: FormRecordData[string]): string {
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
    const { records } = useRecords();

    const tableHeaders = useMemo(() => {
        return formDefinition.fields.map((field) => (
            <TableHead key={field.id}>{field.label}</TableHead>
        ));
    }, [formDefinition.fields]);

    const tableRows = useMemo(() => {
        if (!records) return null;

        return records.map((record) => (
            <TableRow key={record.id}>
                {formDefinition.fields.map((field) => (
                    <TableCell key={`${record.id}-${field.id}`}>
                        {formatCell(record.data[field.name])}
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
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        ));
    }, [records, formDefinition.fields]);

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