'use client';

import Link from 'next/link';
import { useFormDefinitions } from '@/contexts/FormDefinitionsContext';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { FormList } from '@/components/forms/FormList';
import { PageHeader } from '@/components/layout/PageHeader';

export default function FormsPage() {
    const { formDefinitions } = useFormDefinitions();

    const hasForms = formDefinitions && formDefinitions.length > 0;

    const action = (
        <Button asChild>
            <Link href="/forms/new">
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                Create New Form
            </Link>
        </Button>
    );

    return (
        <div className="space-y-6">
            <PageHeader
                title="My Forms"
                description="A list of all the form definitions you have created."
                action={action}
            />
            {hasForms ? (
                <FormList />
            ) : (
                <EmptyState
                    title="No forms yet"
                    description="Get started by creating your first form definition."
                    actions={action}
                />
            )}
        </div>
    );
} 