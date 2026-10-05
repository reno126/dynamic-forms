'use client';

import { useFormDefinitions } from '@/contexts/FormDefinitionsContext';
import { Button } from '@/lib/ui/button';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/layout/PageHeader';
import { RecordCountList } from '@/components/forms/RecordCountList';

export default function ListsPage() {
    const { formDefinitions } = useFormDefinitions();
    const hasForms = formDefinitions && formDefinitions.length > 0;

    return (
        <div className="space-y-4 sm:space-y-6">
            <PageHeader
                title="My Lists"
                description="Select a form to view, add, or manage its records."
            />

            {hasForms ? (
                <RecordCountList />
            ) : (
                <EmptyState
                    title="No forms found"
                    description="You need to create a form definition before you can manage records."
                    actions={
                        <Button asChild>
                            <Link href="/forms/new">
                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                Create New Form
                            </Link>
                        </Button>
                    }
                />
            )}
        </div>
    );
} 
