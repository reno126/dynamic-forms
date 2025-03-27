'use client';

import React from 'react';
import { RecordsProvider, useRecords } from '@/contexts/RecordsContext';
import { useRecordActions } from '@/contexts/RecordsContext';
import { useFormDefinition } from '@/hooks/useFormDefinition';
import Link from 'next/link';
import { ArrowLeft, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecordsTable } from '@/components/records/RecordsTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { useModal } from '@/contexts/ModalContext';

interface RecordsListPageProps {
    params: Promise<{
        formId: string;
    }>;
}

function RecordsListView({ formId }: { formId: string }) {
    const { showModal } = useModal();
    const formDefinition = useFormDefinition(formId);
    const { records } = useRecords();
    const { deleteAllRecords } = useRecordActions();

    if (formDefinition === undefined || records === undefined) {
        return <div>Loading...</div>;
    }

    if (formDefinition === null) {
        return <div>Form not found.</div>;
    }

    const hasRecords = records && records.length > 0;

    const handleAddRecord = () => {
        showModal('addOrUpdateRecord', { formDefinition });
    };

    const handleDeleteAll = () => {
        showModal('confirm', {
            title: 'Are you absolutely sure?',
            description: 'This action cannot be undone. This will permanently delete all records for this form.',
            onConfirm: () => deleteAllRecords(formId),
        });
    };

    return (
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
                            onClick={handleDeleteAll}
                        >
                            Delete All Records
                        </Button>
                    )}
                    <Button onClick={handleAddRecord}>
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
                            <Button onClick={handleAddRecord}>
                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                Add New Record
                            </Button>
                        }
                    />
                )}
            </div>
        </div>
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