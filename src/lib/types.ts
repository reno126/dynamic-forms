export type FormFieldType =
    | 'text'
    | 'number'
    | 'date'
    | 'select'
    | 'checkbox';

export interface FormFieldOption {
    value: string;
    label: string;
}

export interface FormField {
    id: string;
    name: string;
    label: string;
    type: FormFieldType;
    options?: FormFieldOption[];
}

export interface FormDefinition {
    id: string;
    name: string;
    description: string;
    fields: FormField[];
}

export type FormRecordData = Record<
    string,
    string | number | boolean | Date | null
>;

export interface FormRecord {
    id: string;
    formId: string;
    data: FormRecordData;
    createdAt: Date;
} 