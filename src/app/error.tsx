'use client';

import { useEffect } from 'react';
import { Button } from '@/lib/ui/button';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/ui/card';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <PageWrapper>
            <div className="flex h-full items-center justify-center">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CardTitle>Something went wrong!</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-500">
                            An unexpected error has occurred. You can try to restore the page.
                        </p>
                        <Button onClick={() => reset()}>Try again</Button>
                    </CardContent>
                </Card>
            </div>
        </PageWrapper>
    );
} 