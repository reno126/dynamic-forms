'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';

export function useTotalRecordCount() {
    const count = useLiveQuery(
        () => db.formRecords.count(),
        [],
        0 // Initial value
    );

    return count;
} 