'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, List, Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/lib/ui/button';

const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/forms', label: 'My Forms', icon: FileText },
    { href: '/lists', label: 'My Lists', icon: List },
    { href: '/management', label: 'Management', icon: Settings },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={cn(
                    "fixed top-0 left-0 h-full w-64 max-w-[85vw] bg-gray-100 p-4 transition-transform transform z-20",
                    "md:relative md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex justify-between items-center mb-4 md:hidden">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <nav className="flex flex-col space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose} // Close sidebar on navigation
                                className={cn(
                                    'flex items-center space-x-3 rounded-md p-2 text-gray-700 hover:bg-gray-200',
                                    isActive && 'bg-gray-200 font-semibold text-gray-900'
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
} 
