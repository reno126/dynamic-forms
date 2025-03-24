'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { AddOrUpdateRecordDialog } from '@/components/records/AddOrUpdateRecordDialog';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { FormDefinition, FormRecord } from '@/lib/types';

// 1. Define the props for each modal. This is the single source of truth.
type ModalProps = {
    addOrUpdateRecord: {
        formDefinition: FormDefinition;
        record?: FormRecord | null;
    };
    confirm: {
        title: string;
        description: string;
        onConfirm: () => void;
    };
};

// 2. Define modal types based on the keys of ModalProps
export type ModalType = keyof ModalProps;

// Define the shape of the modal state
type ModalState<T extends ModalType> = {
    type: T;
    props: ModalProps[T];
};

// 3. Define the context value
interface ModalContextType {
    showModal: <T extends ModalType>(type: T, props: ModalProps[T]) => void;
    hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

// 4. Map modal types to their actual React components
const modalComponents: { [K in ModalType]: React.ComponentType<any> } = {
    addOrUpdateRecord: AddOrUpdateRecordDialog,
    confirm: ConfirmDialog,
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modal, setModal] = useState<ModalState<any> | null>(null);

    const showModal = <T extends ModalType>(type: T, props: ModalProps[T]) => {
        setModal({ type, props });
    };

    const hideModal = () => {
        setModal(null);
    };

    const contextValue = useMemo(() => ({ showModal, hideModal }), []);

    const renderModal = () => {
        if (!modal) {
            return null;
        }
        const modalType: ModalType = modal.type;
        const ModalComponent = modalComponents[modalType];
        if (!ModalComponent) {
            return null;
        }
        return <ModalComponent isOpen={true} onClose={hideModal} {...modal.props} />;
    };

    return (
        <ModalContext.Provider value={contextValue}>
            {children}
            {renderModal()}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}; 