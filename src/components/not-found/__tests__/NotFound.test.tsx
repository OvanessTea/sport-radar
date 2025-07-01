import { render, screen } from '@testing-library/react';
import { NotFound } from '../NotFound';
import { MantineProvider } from '@mantine/core';

describe('NotFound', () => {

    const renderWithProviders = (ui: React.ReactNode) => {
        render(<MantineProvider>{ui}</MantineProvider>)
    }

    it('should render not found component', () => {
        renderWithProviders(<NotFound />)

        expect(screen.getByText('No matches found')).toBeInTheDocument()
    })
})