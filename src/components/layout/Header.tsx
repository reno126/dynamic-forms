import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/lib/ui/button';

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="flex items-center bg-gray-800 p-3 text-white sm:p-4">
            <Button
                variant="ghost"
                size="icon"
                className="mr-3 md:hidden sm:mr-4"
                onClick={onMenuClick}
            >
                <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl">Dynamic Forms</h1>
        </header>
    );
} 
