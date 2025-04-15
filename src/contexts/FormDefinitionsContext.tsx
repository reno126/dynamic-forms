'use client';

import {
    createContext,
    useContext,
    useMemo,
    useCallback
} from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { nanoid } from 'nanoid';
import { db } from '@/lib/db';
import type { FormDefinition, CreateFormValues } from '@/lib/types';

interface FormDefinitionsContextType {
    formDefinitions: FormDefinition[] | null;
    addForm: (form: CreateFormValues) => Promise<string>;
    getFormDefinition: (id: string) => FormDefinition | undefined;
    deleteForm: (id: string) => Promise<void>;
    deleteAllData: () => Promise<void>;
}

const FormDefinitionsContext = createContext<FormDefinitionsContextType | null>(
    null
);

export const FormDefinitionsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const formDefinitions = useLiveQuery(() => db.formDefinitions.toArray(), []);

    const addForm = useCallback(async (form: CreateFormValues) => {
        const newId = nanoid();
        const newForm: FormDefinition = {
            id: newId,
            name: form.name,
            description: form.description || '',
            fields: form.fields.map((field) => {
                const fieldId = nanoid();
                return {
                    id: fieldId,
                    name: field.label.toLowerCase().replace(/\s+/g, '_') || fieldId,
                    label: field.label,
                    type: field.type,
                    isRequired: field.isRequired,
                    isMultiSelect: field.isMultiSelect,
                    options: field.type === 'select' ? field.options || [] : [],
                };
            }),
        };
        await db.formDefinitions.add(newForm);
        return newId;
    }, []);

    const getFormDefinition = useCallback((id: string) => {
        return formDefinitions?.find((form) => form.id === id);
    }, [formDefinitions]);

    const deleteForm = useCallback(async (id: string) => {
        await db.formDefinitions.delete(id);
        await db.formRecords.where('formId').equals(id).delete();
    }, []);

    const deleteAllData = useCallback(async () => {
        await db.delete();
        await db.open();
    }, []);

    const value = useMemo(
        () => ({
            formDefinitions: formDefinitions ?? null,
            addForm,
            getFormDefinition,
            deleteForm,
            deleteAllData,
        }),
        [formDefinitions, addForm, getFormDefinition, deleteForm, deleteAllData]
    );

    return (
        <FormDefinitionsContext.Provider value={value}>
            {children}
        </FormDefinitionsContext.Provider>
    );
};

export const useFormDefinitions = () => {
    const context = useContext(FormDefinitionsContext);
    if (!context) {
        throw new Error(
            'useFormDefinitions must be used within a FormDefinitionsProvider'
        );
    }
    return context;
}; 