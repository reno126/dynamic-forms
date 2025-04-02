'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { AddOrUpdateRecordDialog } from '@/components/records/AddOrUpdateRecordDialog';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { FormDefinition, FormRecord } from '@/lib/types';

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

export type ModalType = keyof ModalProps;

type ModalState<T extends ModalType> = {
    type: T;
    props: ModalProps[T];
};

type AnyModalState = {
    [K in ModalType]: ModalState<K>;
}[ModalType];

interface ModalContextType {
    showModal: <T extends ModalType>(type: T, props: ModalProps[T]) => void;
    hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modal, setModal] = useState<AnyModalState | null>(null);

    const showModal = <T extends ModalType>(type: T, props: ModalProps[T]) => {
        setModal({ type, props } as AnyModalState);
    };

    const hideModal = () => {
        setModal(null);
    };

    const contextValue = useMemo(() => ({ showModal, hideModal }), []);

    const renderModal = () => {
        if (!modal) {
            return null;
        }

        if (modal.type === 'addOrUpdateRecord') {
            return <AddOrUpdateRecordDialog isOpen onClose={hideModal} {...modal.props} />;
        }

        if (modal.type === 'confirm') {
            return <ConfirmDialog isOpen onClose={hideModal} {...modal.props} />;
        }

        return null;
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