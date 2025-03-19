"use client";

import { forwardRef, ComponentPropsWithoutRef } from "react";
import { ChevronDown, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PopoverTrigger } from "@/components/ui/popover";
import { useMultiSelect } from "./context";

type MultiSelectTriggerProps = ComponentPropsWithoutRef<typeof Button>;

export const MultiSelectTrigger = forwardRef<
    HTMLButtonElement,
    MultiSelectTriggerProps
>(({ className, ...props }, ref) => {
    const { placeholder, selectedValues, options, toggleOption } = useMultiSelect();
    return (
        <PopoverTrigger asChild>
            <Button
                ref={ref}
                {...props}
                className={cn(
                    "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-background hover:bg-inherit [&_svg]:pointer-events-auto!",
                    className
                )}
                variant="outline"
            >
                <div className="flex flex-wrap items-center gap-1 flex-grow">
                    {selectedValues.length > 0 ? (
                        selectedValues.map((value) => {
                            const option = options.find((o) => o.value === value);
                            return (
                                <Badge key={value} variant="secondary" className="px-2 py-1">
                                    <span>{option?.label}</span>
                                    <XCircle
                                        className="ml-2 h-4 w-4 cursor-pointer"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            toggleOption(value);
                                        }}
                                    />
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
    );
});

MultiSelectTrigger.displayName = "MultiSelectTrigger"; 