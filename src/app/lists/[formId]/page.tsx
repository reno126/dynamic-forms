'use client';

import React, { useState } from 'react';
import { RecordsProvider, useRecords } from '@/contexts/RecordsContext';
import { useFormDefinition } from '@/hooks/useFormDefinition';
import Link from 'next/link';
import { ArrowLeft, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecordsTable } from '@/components/records/RecordsTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { AddOrUpdateRecordDialog } from '@/components/records/AddOrUpdateRecordDialog';
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

interface RecordsListPageProps {
    params: Promise<{
        formId: string;
    }>;
}

function RecordsListView({ formId }: { formId: string }) {
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const formDefinition = useFormDefinition(formId);
    const { records, deleteAllRecords } = useRecords();

    if (formDefinition === undefined || records === undefined) {
        return <div>Loading...</div>;
    }

    if (formDefinition === null) {
        return <div>Form not found.</div>;
    }

    const hasRecords = records && records.length > 0;

    const handleDeleteAll = () => {
        deleteAllRecords();
        setDeleteDialogOpen(false);
    };

    return (
        <>
            <div className="space-y-6">
                <div>
                    <Link
                        href="/lists"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to all lists
                    </Link>
                </div>
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {formDefinition.name}
                        </h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all records submitted to this form.
                        </p>
                    </div>
                    <div className="mt-4 flex space-x-2 sm:ml-16 sm:mt-0">
                        {hasRecords && (
                            <Button
                                variant="destructive"
                                onClick={() => setDeleteDialogOpen(true)}
                            >
                                Delete All Records
                            </Button>
                        )}
                        <Button onClick={() => setAddDialogOpen(true)}>
                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                            Add New Record
                        </Button>
                    </div>
                </div>

                <div className="mt-8">
                    {hasRecords ? (
                        <RecordsTable formDefinition={formDefinition} />
                    ) : (
                        <EmptyState
                            title="No records yet"
                            description="Get started by adding the first record for this form."
                            actions={
                                <Button onClick={() => setAddDialogOpen(true)}>
                                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                    Add New Record
                                </Button>
                            }
                        />
                    )}
                </div>
            </div>
            <AddOrUpdateRecordDialog
                isOpen={isAddDialogOpen}
                onClose={() => setAddDialogOpen(false)}
                formDefinition={formDefinition}
            />
            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete all
                            records for this form.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAll}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default function RecordsListPage({ params }: RecordsListPageProps) {
    const { formId } = React.use(params);
    return (
        <RecordsProvider formId={formId}>
            <RecordsListView formId={formId} />
        </RecordsProvider>
    );
} 