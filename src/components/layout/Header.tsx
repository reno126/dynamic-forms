import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/lib/ui/button';

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="bg-gray-800 text-white p-4 flex items-center">
            <Button
                variant="ghost"
                size="icon"
                className="mr-4 md:hidden"
                onClick={onMenuClick}
            >
                <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl">Dynamic Forms</h1>
        </header>
    );
} 