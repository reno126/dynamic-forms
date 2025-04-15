'use client';

import React from 'react';
import { useFormDefinition } from '@/hooks/useFormDefinition';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/lib/ui/card';
import { Badge } from '@/lib/ui/badge';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BackLinkButton } from '@/components/ui/BackLinkButton';

interface FormDetailsPageProps {
    params: Promise<{
        formId: string;
    }>;
}

export default function FormDetailsPage({ params }: FormDetailsPageProps) {
    const { formId } = React.use(params);
    const formDefinition = useFormDefinition(formId);

    if (formDefinition === undefined) {
        return <div>Loading form details...</div>;
    }

    if (formDefinition === null) {
        return (
            <PageWrapper>
                <BackLinkButton href="/forms" text="Back to all forms" />
                <p>Form not found.</p>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <div className="space-y-6">
                <BackLinkButton href="/forms" text="Back to all forms" />

                <Card>
                    <CardHeader>
                        <CardTitle data-testid="form-details-title">{formDefinition.name}</CardTitle>
                        <CardDescription>{formDefinition.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h4 className="mb-4 text-lg font-medium">Fields</h4>
                        <div className="space-y-4">
                            {formDefinition.fields.map((field) => (
                                <div
                                    key={field.name}
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
        </PageWrapper>
    );
} 