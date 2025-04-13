import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '@/lib/ui/button';
import { PageHeader } from '@/components/layout/PageHeader';
import { BackLinkButton } from '@/components/ui/BackLinkButton';

describe('PageHeader', () => {
    it('should render the title', () => {
        const title = 'My Page Title';
        render(<PageHeader title={title} />);
        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    });

    it('should render the title and description when description is provided', () => {
        const title = 'My Page Title';
        const description = 'This is a description of the page.';
        render(<PageHeader title={title} description={description} />);

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
    });

    it('should not render the description when it is not provided', () => {
        const title = 'My Page Title';
        render(<PageHeader title={title} />);
        expect(screen.queryByText(/this is a description/i)).not.toBeInTheDocument();
    });

    it('should render an action element when provided', () => {
        const title = 'My Page Title';
        const action = <Button>Click Me</Button>;
        render(<PageHeader title={title} action={action} />);

        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should not render an action element when not provided', () => {
        const title = 'My Page Title';
        render(<PageHeader title={title} />);

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should render title, description, and action all together', () => {
        const title = 'Complete Page Header';
        const description = 'Everything is here.';
        const action = <Button>Do Something</Button>;
        render(<PageHeader title={title} description={description} action={action} />);

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /do something/i })).toBeInTheDocument();
    });
}); 