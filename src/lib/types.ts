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
    options?: { value: string }[];
    isRequired?: boolean;
    isMultiSelect?: boolean;
}

export interface FormDefinition {
    id: string;
    name: string;
    description: string;
    fields: FormField[];
}

export type FormRecordData = Record<
    string,
    string | number | boolean | Date | string[] | null
>;

export interface FormRecord {
    id: string;
    formId: string;
    data: FormRecordData;
    createdAt: Date;
}

export type FormBuilderField = {
    name: string;
    label: string;
    type: FormFieldType;
    isRequired?: boolean;
    options?: { value: string }[];
    isMultiSelect?: boolean;
};

export type CreateFormValues = {
    name: string;
    description?: string;
    fields: FormBuilderField[];
}; 