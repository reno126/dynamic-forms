'use client';

import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useFormDefinitions } from '@/contexts/FormDefinitionsContext';
import type { FormDefinition } from '@/lib/types';
import { ChevronRight } from 'lucide-react';
import { useRecordCount } from '@/hooks/useRecordCount';

function RecordCountListRow({ form }: { form: FormDefinition }) {
    const recordCount = useRecordCount(form.id);
    return (
        <TableRow>
            <TableCell className="font-medium">{form.name}</TableCell>
            <TableCell>{recordCount ?? '...'}</TableCell>
            <TableCell className="text-right">
                <Link
                    href={`/lists/${form.id}`}
                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                    View List
                    <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
            </TableCell>
        </TableRow>
    );
}

export function RecordCountList() {
    const { formDefinitions } = useFormDefinitions();

    if (!formDefinitions || formDefinitions.length === 0) {
        return null;
    }

    return (
        <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Form Name</TableHead>
                        <TableHead>Records</TableHead>
                        <TableHead>
                            <span className="sr-only">View</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {formDefinitions.map((form) => (
                        <RecordCountListRow key={form.id} form={form} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
} 