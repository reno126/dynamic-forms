import Dexie, { type Table } from 'dexie';
import type { FormDefinition, FormRecord } from '@/lib/types';

export class DynamicFormsDatabase extends Dexie {
    formDefinitions!: Table<FormDefinition>;
    formRecords!: Table<FormRecord>;

    constructor() {
        super('dynamicFormsDatabase');
        this.version(1).stores({
            formDefinitions: 'id, name',
            formRecords: 'id, formId, createdAt',
        });
    }
}

export const db = new DynamicFormsDatabase();
