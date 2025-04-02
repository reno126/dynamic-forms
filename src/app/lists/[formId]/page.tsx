'use client';

import React from 'react';
import { RecordsProvider, useRecords } from '@/contexts/RecordsContext';
import { useRecordActions } from '@/contexts/RecordsContext';
import { useFormDefinition } from '@/hooks/useFormDefinition';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecordsTable } from '@/components/records/RecordsTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { useModal } from '@/contexts/ModalContext';
import { PageHeader } from '@/components/layout/PageHeader';
import { BackLinkButton } from '@/components/ui/BackLinkButton';
import { PageWrapper } from '@/components/layout/PageWrapper';

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
        return (
            <PageWrapper>
                <BackLinkButton href="/lists" text="Back to all lists" />
                <p>Form not found.</p>
            </PageWrapper>
        );
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

    const action = (
        <div className="flex space-x-2">
            {hasRecords && (
                <Button variant="destructive" onClick={handleDeleteAll}>
                    Delete All Records
                </Button>
            )}
            <Button onClick={handleAddRecord}>
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                Add New Record
            </Button>
        </div>
    );

    return (
        <PageWrapper>
            <BackLinkButton href="/lists" text="Back to all lists" />
            <PageHeader
                title={formDefinition.name}
                description={formDefinition.description || 'Manage and view the records for this form.'}
                action={action}
            />

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
        </PageWrapper>
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