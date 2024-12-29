'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/EmptyState';
import { FormList } from '@/components/forms/FormList';
import { useFormDefinitions } from '@/contexts/FormDefinitionsContext';
import { PlusIcon } from 'lucide-react';
import { CreateFormDialog } from '@/components/forms/CreateFormDialog';

export default function FormsPage() {
    const { formDefinitions } = useFormDefinitions();
    const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
    const hasForms = formDefinitions && formDefinitions.length > 0;

    return (
        <>
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">My Forms</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the form definitions you have created.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0">
                    <Button onClick={() => setCreateDialogOpen(true)}>
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                        Create New Form
                    </Button>
                </div>
            </div>

            <div className="mt-8">
                {hasForms ? (
                    <FormList />
                ) : (
                    <EmptyState
                        title="No forms created yet"
                        description="Get started by creating your first form definition."
                        actions={
                            <Button onClick={() => setCreateDialogOpen(true)}>
                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                Create New Form
                            </Button>
                        }
                    />
                )}
            </div>
            <CreateFormDialog
                isOpen={isCreateDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
            />
        </>
    );
} 