'use client';

import { useState } from 'react';
import { useFormDefinitions } from '@/contexts/FormDefinitionsContext';
import { Button } from '@/components/ui/button';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManagementPage() {
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { deleteAllData } = useFormDefinitions();

    const handleDeleteAll = () => {
        deleteAllData();
        setDeleteDialogOpen(false);
    };

    return (
        <>
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
                            onClick={() => setDeleteDialogOpen(true)}
                        >
                            Delete All Data
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete all
                            form definitions and all collected records. Are you sure you
                            want to continue?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAll}>
                            Yes, Delete Everything
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
} 