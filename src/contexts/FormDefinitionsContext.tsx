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
import type { FormDefinition } from '@/lib/types';

type FormDefinitionsContextType = {
    formDefinitions: FormDefinition[] | undefined;
    addForm: (
        form: Omit<FormDefinition, 'id' | 'fields'> & {
            fields: Omit<FormDefinition['fields'][number], 'id'>[];
        }
    ) => Promise<void>;
    updateForm: (form: FormDefinition) => Promise<void>;
    deleteForm: (id: string) => Promise<void>;
    deleteAllData: () => Promise<void>;
};

const FormDefinitionsContext = createContext<
    FormDefinitionsContextType | undefined
>(undefined);

export function FormDefinitionsProvider({ children }: { children: ReactNode }) {
    const formDefinitions = useLiveQuery(() => db.formDefinitions.toArray(), []);

    const addForm = useCallback(
        async (
            form: Omit<FormDefinition, 'id' | 'fields'> & {
                fields: Omit<FormDefinition['fields'][number], 'id'>[];
            }
        ) => {
            try {
                const newForm: FormDefinition = {
                    ...form,
                    id: nanoid(),
                    fields: form.fields.map((field) => ({ ...field, id: nanoid() })),
                };
                await db.formDefinitions.add(newForm);
            } catch (error) {
                console.error('Failed to add form:', error);
                // Here we could add more robust error handling, like a toast notification
            }
        },
        []
    );

    const updateForm = useCallback(async (form: FormDefinition) => {
        try {
            await db.formDefinitions.put(form);
        } catch (error) {
            console.error('Failed to update form:', error);
        }
    }, []);

    const deleteForm = useCallback(async (id: string) => {
        try {
            // Also delete all associated records
            await db.transaction('rw', db.formDefinitions, db.formRecords, async () => {
                await db.formDefinitions.delete(id);
                await db.formRecords.where('formId').equals(id).delete();
            });
        } catch (error) {
            console.error('Failed to delete form:', error);
        }
    }, []);

    const deleteAllData = useCallback(async () => {
        try {
            await db.delete();
            await db.open();
        } catch (error) {
            console.error('Failed to delete all data:', error);
        }
    }, []);

    const value = {
        formDefinitions,
        addForm,
        updateForm,
        deleteForm,
        deleteAllData,
    };

    return (
        <FormDefinitionsContext.Provider value={value}>
            {children}
        </FormDefinitionsContext.Provider>
    );
}

export function useFormDefinitions() {
    const context = useContext(FormDefinitionsContext);
    if (context === undefined) {
        throw new Error(
            'useFormDefinitions must be used within a FormDefinitionsProvider'
        );
    }
    return context;
} 