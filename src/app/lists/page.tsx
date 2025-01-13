'use client';

import { useFormDefinitions } from '@/contexts/FormDefinitionsContext';
import { EmptyState } from '@/components/ui/EmptyState';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useRecordCount } from '@/hooks/useRecordCount';
import type { FormDefinition } from '@/lib/types';

function FormListRow({ form }: { form: FormDefinition }) {
    const recordCount = useRecordCount(form.id);
    return (
        <TableRow>
            <TableCell className="font-medium">{form.name}</TableCell>
            <TableCell>{recordCount}</TableCell>
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

export default function ListsPage() {
    const { formDefinitions } = useFormDefinitions();
    const hasForms = formDefinitions && formDefinitions.length > 0;

    return (
        <div>
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">My Lists</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Select a form to view its records or to add a new entry.
                    </p>
                </div>
            </div>

            <div className="mt-8">
                {hasForms && formDefinitions ? (
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
                                    <FormListRow key={form.id} form={form} />
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <EmptyState
                        title="No forms available"
                        description="You need to create a form definition first before you can add records."
                    />
                )}
            </div>
        </div>
    );
} 