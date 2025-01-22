'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';

export function useRecordCount(formId: string) {
    const count = useLiveQuery(
        () => db.formRecords.where('formId').equals(formId).count(),
        [formId],
        0 // Initial value
    );

    return count;
} 