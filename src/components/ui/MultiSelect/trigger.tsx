"use client";

import { forwardRef, ComponentPropsWithoutRef } from "react";
import { ChevronDown, XCircle } from "lucide-react";
import * as React from 'react';

import { cn } from "@/lib/utils";
import { Button } from "@/lib/ui/button";
import { Badge } from "@/lib/ui/badge";
import { PopoverTrigger } from "@/lib/ui/popover";
import { useMultiSelect } from "./context";

type MultiSelectTriggerProps = ComponentPropsWithoutRef<typeof Button>;

export const MultiSelectTrigger = forwardRef<
    HTMLButtonElement,
    MultiSelectTriggerProps
>(({ className, ...props }, ref) => {
    const { placeholder, selectedValues, options, toggleOption } = useMultiSelect();
    return (
        <div className="flex w-full items-center gap-1">
            <PopoverTrigger asChild>
                <Button
                    ref={ref}
                    {...props}
                    className={cn(
                        "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-background hover:bg-inherit",
                        className
                    )}
                    variant="outline"
                >
                    <div className="flex flex-grow flex-wrap items-center gap-1">
                        {selectedValues.length > 0 ? (
                            selectedValues.map((selectedValue) => {
                                const selectedOption = options.find((candidateOption) => candidateOption.value === selectedValue);
                                return (
                                    <Badge key={selectedValue} variant="secondary" className="px-2 py-1">
                                        {selectedOption?.label ?? selectedValue}
                                    </Badge>
                                );
                            })
                        ) : (
                            <span className="mx-1 text-sm text-muted-foreground">{placeholder}</span>
                        )}
                    </div>
                    <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            {selectedValues.map((selectedValue) => {
                const selectedOption = options.find((candidateOption) => candidateOption.value === selectedValue);
                const accessibleOptionName = selectedOption?.label ?? selectedValue;

                return (
                    <Button
                        key={selectedValue}
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Remove ${accessibleOptionName}`}
                        onClick={() => toggleOption(selectedValue)}
                    >
                        <XCircle className="h-4 w-4" />
                    </Button>
                );
            })}
        </div>
    );
});

MultiSelectTrigger.displayName = "MultiSelectTrigger";
