'use client';

import { useFormDefinitions } from '@/contexts/FormDefinitionsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useModal } from '@/contexts/ModalContext';

export default function ManagementPage() {
    const { deleteAllData } = useFormDefinitions();
    const { showModal } = useModal();

    const handleConfirmDeleteAll = () => {
        showModal('confirm', {
            title: 'Are you absolutely sure?',
            description:
                'This action cannot be undone. This will permanently delete all form definitions and all collected records. Are you sure you want to continue?',
            onConfirm: deleteAllData,
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Management</h1>
                <p className="mt-2 text-sm text-gray-700">
                    High-risk operations. Please be careful.
                </p>
            </div>
            <Card className="border-red-500">
                <CardHeader>
                    <CardTitle>Delete All Application Data</CardTitle>
                    <CardDescription>
                        This action is irreversible. It will permanently delete all your
                        form definitions and all the records you have collected.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        variant="destructive"
                        onClick={handleConfirmDeleteAll}
                    >
                        Delete All Data
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
} 