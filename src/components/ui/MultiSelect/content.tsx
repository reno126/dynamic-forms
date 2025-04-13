"use client";
import {
    forwardRef,
    ComponentPropsWithoutRef,
    useEffect,
    useRef,
} from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@/lib/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/lib/ui/command";
import { useMultiSelect } from "./context";

type MultiSelectContentProps = ComponentPropsWithoutRef<typeof PopoverContent>;

export const MultiSelectContent = forwardRef<
    HTMLDivElement,
    MultiSelectContentProps
>(({ className, ...props }, ref) => {
    const { options, selectedValues, toggleOption } = useMultiSelect();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <PopoverContent
            ref={ref}
            className={cn("w-[var(--radix-popover-trigger-width)] p-0", className)}
            align="start"
            {...props}
        >
            <Command>
                <CommandInput ref={inputRef} placeholder="Search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                        {options.map((option) => {
                            const isSelected = selectedValues.includes(option.value);
                            return (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => toggleOption(option.value)}
                                    className="cursor-pointer"
                                >
                                    <div
                                        className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            isSelected
                                                ? "bg-primary text-primary-foreground"
                                                : "opacity-50 [&_svg]:invisible"
                                        )}
                                    >
                                        <CheckIcon className="h-4 w-4" />
                                    </div>
                                    <span>{option.label}</span>
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    );
});

MultiSelectContent.displayName = "MultiSelectContent"; 