import React from 'react';
import { render, screen } from '@testing-library/react';
import { BackLinkButton } from '@/components/ui/BackLinkButton';

describe('BackLinkButton', () => {
    it('should render a link with the correct href and text', () => {
        const href = '/test-path';
        const text = 'Go Back';

        render(<BackLinkButton href={href} text={text} />);

        const linkElement = screen.getByRole('link');

        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', href);
        expect(linkElement).toHaveTextContent(text);
    });

    it('should render the back arrow icon', () => {
        render(<BackLinkButton href="/" text="Back" />);
        expect(screen.getByText('Back')).toBeInTheDocument();
    });
}); 