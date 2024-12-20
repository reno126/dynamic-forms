'use client';

import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/EmptyState';
import { FormList } from '@/components/forms/FormList';
import { useFormDefinitions } from '@/contexts/FormDefinitionsContext';
import { PlusIcon } from 'lucide-react';

export default function FormsPage() {
    const { formDefinitions } = useFormDefinitions();
    const hasForms = formDefinitions && formDefinitions.length > 0;

    const handleCreateForm = () => {
        // TODO: Implement form creation dialog
        console.log('Create form clicked');
    };

    return (
        <div>
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">My Forms</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the form definitions you have created.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0">
                    <Button onClick={handleCreateForm}>
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
                            <Button onClick={handleCreateForm}>
                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                Create New Form
                            </Button>
                        }
                    />
                )}
            </div>
        </div>
    );
} 