import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/lib/ui/button';

// Mock the illustration component to avoid testing its implementation details
jest.mock('@/components/illustrations/EmptyBoxIllustration', () => ({
    EmptyBoxIllustration: () => <div data-testid="empty-box-illustration" />,
}));

describe('EmptyState', () => {
    it('should render the title and description', () => {
        const title = 'No items found';
        const description = 'There are no items to display here.';
        render(<EmptyState title={title} description={description} />);

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
    });

    it('should render the illustration', () => {
        render(<EmptyState title="Title" description="Desc" />);
        expect(screen.getByTestId('empty-box-illustration')).toBeInTheDocument();
    });

    it('should render actions when provided', () => {
        const title = 'Create your first item';
        const description = 'Get started by creating a new item.';
        const actions = <Button>Create Item</Button>;

        render(<EmptyState title={title} description={description} actions={actions} />);

        const button = screen.getByRole('button', { name: /Create Item/i });
        expect(button).toBeInTheDocument();
    });

    it('should not render the actions container when actions are not provided', () => {
        render(<EmptyState title="Title" description="Desc" />);

        // The container for actions has a specific margin-top class.
        // A more direct way is to check for the absence of the button or action elements.
        const button = screen.queryByRole('button');
        expect(button).not.toBeInTheDocument();
    });
}); 