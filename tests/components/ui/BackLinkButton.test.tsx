import React from 'react';
import { render, screen } from '@testing-library/react';
import { BackLinkButton } from '@/components/ui/BackLinkButton';

describe('BackLinkButton', () => {
    it('should render a link with the correct href and text', () => {
        // Arrange
        const href = '/previous-page';
        const text = 'Go Back';

        // Act
        render(<BackLinkButton href={href} text={text} />);

        // Assert
        const link = screen.getByRole('link', { name: /Go Back/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', href);
    });
}); 