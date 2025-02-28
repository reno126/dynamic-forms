export type FormFieldType =
    | 'text'
    | 'number'
    | 'date'
    | 'select'
    | 'checkbox';

export const FORM_FIELD_TYPES = [
    'text',
    'number',
    'date',
    'select',
    'checkbox',
] as const;

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
    isRequired?: boolean;
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