'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Header } from '@/components/layout/Header';

export function MainLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-full">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex min-w-0 flex-1 flex-col">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />
                <PageWrapper>{children}</PageWrapper>
            </div>
        </div>
    );
} 