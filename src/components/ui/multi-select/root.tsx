"use client";

import { useMemo, PropsWithChildren, useState } from "react";
import { Popover } from "@/components/ui/popover";
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

    const toggleOption = (val: string) => {
        const newSelectedValues = value.includes(val)
            ? value.filter((v) => v !== val)
            : [...value, val];

        if (onValueChange) {
            onValueChange(newSelectedValues);
        }
    };

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