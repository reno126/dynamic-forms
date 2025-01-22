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
import type { FormDefinition } from '@/lib/types';
import { useMemo } from 'react';

interface RecordsTableProps {
    formDefinition: FormDefinition;
}

export function RecordsTable({ formDefinition }: RecordsTableProps) {
    const { records } = useRecords();

    const tableHeaders = useMemo(() => {
        return formDefinition.fields.map((field) => (
            <TableHead key={field.id}>{field.label}</TableHead>
        ));
    }, [formDefinition.fields]);

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
                    {/* TODO: Render table rows */}
                    <TableRow>
                        <TableCell colSpan={formDefinition.fields.length + 1} className="text-center">
                            No records yet.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
} 