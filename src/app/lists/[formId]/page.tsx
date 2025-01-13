'use client';

import { RecordsProvider } from '@/contexts/RecordsContext';
import { useFormDefinition } from '@/hooks/useFormDefinition';
import Link from 'next/link';
import { ArrowLeft, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecordsListPageProps {
    params: {
        formId: string;
    };
}

function RecordsListView({ formId }: { formId: string }) {
    const formDefinition = useFormDefinition(formId);

    if (formDefinition === undefined) {
        return <div>Loading...</div>;
    }

    if (formDefinition === null) {
        return <div>Form not found.</div>;
    }

    const handleAddRecord = () => {
        // TODO: Implement dialog
        console.log('Add record clicked');
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
                <div className="mt-4 sm:ml-16 sm:mt-0">
                    <Button onClick={handleAddRecord}>
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                        Add New Record
                    </Button>
                </div>
            </div>

            {/* TODO: Implement Records Table and Empty State */}
            <div className="mt-8">
                <p>Records table will go here...</p>
            </div>
        </div>
    );
}


export default function RecordsListPage({ params }: RecordsListPageProps) {
    return (
        <RecordsProvider formId={params.formId}>
            <RecordsListView formId={params.formId} />
        </RecordsProvider>
    );
} 