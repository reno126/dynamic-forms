import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { FormDefinition, FormRecordData } from './types';
import { Badge } from '@/components/ui/badge';
import React from 'react';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCell(
    data: FormRecordData[string] | undefined,
    field: FormDefinition['fields'][0]
): React.ReactNode {
    if (field.isMultiSelect && Array.isArray(data)) {
        return (
            <div className="flex flex-wrap gap-1">
                {data.map((item, index) => (
                    <Badge key={`${String(item)}-${index}`} variant="secondary">
                        {String(item)}
                    </Badge>
                ))}
            </div>
        );
    }

    if (data instanceof Date) {
        return data.toLocaleDateString();
    }

    if (typeof data === 'boolean') {
        return data ? 'Yes' : 'No';
    }

    if (data === null || data === undefined) {
        return 'N/A';
    }

    return String(data);
} 