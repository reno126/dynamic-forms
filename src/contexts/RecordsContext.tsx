'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import type { FormRecord, FormRecordData } from '@/lib/types';
import { nanoid } from 'nanoid';

// --- 1. Context and Hook for Actions (Global) ---
interface RecordActionsContextType {
    addRecord: (formId: string, data: FormRecordData) => Promise<void>;
    updateRecord: (record: FormRecord) => Promise<void>;
    deleteRecord: (id: string) => Promise<void>;
    deleteAllRecords: (formId: string) => Promise<void>;
}

const RecordActionsContext = createContext<RecordActionsContextType | null>(null);

export const RecordActionsProvider = ({ children }: { children: React.ReactNode }) => {
    const addRecord = async (formId: string, data: FormRecordData) => {
        const newRecord: FormRecord = {
            id: nanoid(),
            formId,
            data,
            createdAt: new Date(),
        };
        await db.formRecords.add(newRecord);
    };

    const updateRecord = async (record: FormRecord) => {
        await db.formRecords.put(record);
    };

    const deleteRecord = async (id: string) => {
        await db.formRecords.delete(id);
    };

    const deleteAllRecords = async (formId: string) => {
        await db.formRecords.where('formId').equals(formId).delete();
    };

    const value = useMemo(() => ({
        addRecord,
        updateRecord,
        deleteRecord,
        deleteAllRecords,
    }), []);

    return (
        <RecordActionsContext.Provider value={value}>
            {children}
        </RecordActionsContext.Provider>
    );
};

export const useRecordActions = () => {
    const context = useContext(RecordActionsContext);
    if (!context) {
        throw new Error('useRecordActions must be used within a RecordActionsProvider');
    }
    return context;
};

// --- 2. Context and Hook for Data (Scoped per form) ---
interface RecordsContextType {
    records: FormRecord[] | undefined;
}

const RecordsContext = createContext<RecordsContextType | null>(null);

export const RecordsProvider = ({
    formId,
    children,
}: {
    formId: string;
    children: React.ReactNode;
}) => {
    const records = useLiveQuery(
        () => db.formRecords.where('formId').equals(formId).sortBy('createdAt'),
        [formId]
    );

    const value = useMemo(() => ({ records }), [records]);

    return (
        <RecordsContext.Provider value={value}>
            {children}
        </RecordsContext.Provider>
    );
};

export const useRecords = () => {
    const context = useContext(RecordsContext);
    if (!context) {
        throw new Error('useRecords must be used within a RecordsProvider');
    }
    return context;
}; 