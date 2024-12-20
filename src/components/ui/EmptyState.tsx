import { EmptyBoxIllustration } from '@/components/illustrations/EmptyBoxIllustration';

interface EmptyStateProps {
    title: string;
    description: string;
    actions?: React.ReactNode;
}

export function EmptyState({ title, description, actions }: EmptyStateProps) {
    return (
        <div className="text-center">
            <EmptyBoxIllustration />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
            {actions && <div className="mt-6">{actions}</div>}
        </div>
    );
} 