'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';

export function useFormDefinition(formId: string) {
    const formDefinition = useLiveQuery(
        () => db.formDefinitions.get(formId),
        [formId]
    );

    return formDefinition;
} 