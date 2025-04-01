'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BackLinkButtonProps {
    href: string;
    text: string;
}

export function BackLinkButton({ href, text }: BackLinkButtonProps) {
    return (
        <div className="mb-4">
            <Link
                href={href}
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {text}
            </Link>
        </div>
    );
} 