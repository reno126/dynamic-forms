'use client';

import {
    createContext,
    useContext,
    type ReactNode,
    useCallback,
} from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { nanoid } from 'nanoid';
import { db } from '@/lib/db';
import type { FormRecord, FormRecordData } from '@/lib/types';

type RecordsContextType = {
    records: FormRecord[] | undefined;
    addRecord: (data: FormRecordData) => Promise<void>;
    updateRecord: (record: FormRecord) => Promise<void>;
    deleteRecord: (id: string) => Promise<void>;
    deleteAllRecords: () => Promise<void>;
};

const RecordsContext = createContext<RecordsContextType | undefined>(
    undefined
);

export function RecordsProvider({
    children,
    formId,
}: {
    children: ReactNode;
    formId: string;
}) {
    const records = useLiveQuery(
        () => db.formRecords.where('formId').equals(formId).sortBy('createdAt'),
        [formId],
        []
    );

    const addRecord = useCallback(
        async (data: FormRecordData) => {
            try {
                const newRecord: FormRecord = {
                    id: nanoid(),
                    formId,
                    data,
                    createdAt: new Date(),
                };
                await db.formRecords.add(newRecord);
            } catch (error) {
                console.error('Failed to add record:', error);
            }
        },
        [formId]
    );

    const updateRecord = useCallback(async (record: FormRecord) => {
        try {
            await db.formRecords.put(record);
        } catch (error) {
            console.error('Failed to update record:', error);
        }
    }, []);

    const deleteRecord = useCallback(async (id: string) => {
        try {
            await db.formRecords.delete(id);
        } catch (error) {
            console.error('Failed to delete record:', error);
        }
    }, []);

    const deleteAllRecords = useCallback(async () => {
        try {
            await db.formRecords.where('formId').equals(formId).delete();
        } catch (error) {
            console.error('Failed to delete all records:', error);
        }
    }, [formId]);

    const value = {
        records,
        addRecord,
        updateRecord,
        deleteRecord,
        deleteAllRecords,
    };

    return (
        <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>
    );
}

export function useRecords() {
    const context = useContext(RecordsContext);
    if (context === undefined) {
        throw new Error('useRecords must be used within a RecordsProvider');
    }
    return context;
} 