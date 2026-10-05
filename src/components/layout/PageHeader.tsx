import React from 'react';

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
    return (
        <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <div className="min-w-0">
                <h1
                    className="text-2xl font-semibold text-gray-900 wrap-anywhere"
                    data-testid={`page-header-${title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                    {title}
                </h1>
                {description && (
                    <p className="mt-2 text-sm text-gray-700 wrap-anywhere">{description}</p>
                )}
            </div>
            {action && <div className="mt-3 min-w-0 sm:mt-0">{action}</div>}
        </div>
    );
} 
