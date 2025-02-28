'use client';

import { useFormDefinition } from '@/hooks/useFormDefinition';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface FormDetailsPageProps {
    params: {
        formId: string;
    };
}

export default function FormDetailsPage({ params }: FormDetailsPageProps) {
    const formDefinition = useFormDefinition(params.formId);

    if (formDefinition === undefined) {
        return <div>Loading form details...</div>;
    }

    if (formDefinition === null) {
        return <div>Form not found.</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <Link
                    href="/forms"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to all forms
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>{formDefinition.name}</CardTitle>
                    <CardDescription>{formDefinition.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <h4 className="mb-4 text-lg font-medium">Fields</h4>
                    <div className="space-y-4">
                        {formDefinition.fields.map((field) => (
                            <div
                                key={field.id}
                                className="flex items-center justify-between rounded-md border p-4"
                            >
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="font-semibold">{field.label}</p>
                                        <p className="text-sm text-gray-500">{field.name}</p>
                                    </div>
                                    {field.isRequired && <Badge variant="outline">Required</Badge>}
                                </div>
                                <Badge variant="secondary">{field.type}</Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 