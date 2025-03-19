import { createContext, useContext } from "react";

export interface MultiSelectContextProps {
    options: { label: string; value: string }[];
    selectedValues: string[];
    toggleOption: (value: string) => void;
    placeholder?: string;
}

export const MultiSelectContext = createContext<MultiSelectContextProps | null>(null);

export const useMultiSelect = () => {
    const context = useContext(MultiSelectContext);
    if (!context) {
        throw new Error("useMultiSelect must be used within a MultiSelectProvider");
    }
    return context;
}; 