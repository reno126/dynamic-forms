"use client";

import { useMemo, PropsWithChildren, useState, useCallback } from "react";
import * as React from 'react';
import { Popover } from '@/lib/ui/popover';
import { MultiSelectContext } from "./context";

type MultiSelectProps = PropsWithChildren<{
    options: { label: string; value: string }[];
    value: string[];
    onValueChange: (value: string[]) => void;
    placeholder?: string;
}>;

export const MultiSelect = ({
    children,
    options,
    value,
    onValueChange,
    placeholder,
}: MultiSelectProps) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const toggleOption = useCallback((val: string) => {
        const newSelectedValues = value.includes(val)
            ? value.filter((v) => v !== val)
            : [...value, val];

        if (onValueChange) {
            onValueChange(newSelectedValues);
        }
    }, [value, onValueChange]);

    const contextValue = useMemo(() => ({
        options,
        selectedValues: value,
        toggleOption,
        placeholder
    }), [options, value, toggleOption, placeholder]);


    return (
        <MultiSelectContext.Provider value={contextValue}>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                {children}
            </Popover>
        </MultiSelectContext.Provider>
    );
};

MultiSelect.displayName = "MultiSelect"; 