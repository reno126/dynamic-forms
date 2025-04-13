'use client';

import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/lib/ui/table';
import { useFormDefinitions } from '@/contexts/FormDefinitionsContext';
import type { FormDefinition } from '@/lib/types';

export function FormList() {
    const { formDefinitions } = useFormDefinitions();

    if (!formDefinitions || formDefinitions.length === 0) {
        // Empty state will be handled in the page component
        return null;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[250px]">Form Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Fields</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {formDefinitions.map((form: FormDefinition) => (
                    <TableRow key={form.id}>
                        <TableCell className="font-medium">
                            <Link
                                href={`/forms/${form.id}`}
                                className="hover:underline"
                            >
                                {form.name}
                            </Link>
                        </TableCell>
                        <TableCell>{form.description}</TableCell>
                        <TableCell className="text-right">{form.fields.length}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
} 