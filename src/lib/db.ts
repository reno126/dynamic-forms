import Dexie, { type Table } from 'dexie';
import type { FormDefinition, FormRecord } from '@/lib/types';

export class DynamicFormsDatabase extends Dexie {
    formDefinitions!: Table<FormDefinition>;
    formRecords!: Table<FormRecord>;

    constructor() {
        super('dynamicFormsDatabase');
        this.version(1).stores({
            // Primary key 'id', index 'name' for uniqueness checks
            formDefinitions: 'id, name',
            // Primary key 'id', index 'formId' for querying, index 'createdAt' for sorting
            formRecords: 'id, formId, createdAt',
        });
    }
}

export const db = new DynamicFormsDatabase();
