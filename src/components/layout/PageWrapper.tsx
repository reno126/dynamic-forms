import React from 'react';

export function PageWrapper({ children }: { children: React.ReactNode }) {
    return <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>;
} 
