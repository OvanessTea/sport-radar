import { fireEvent, render, screen } from '@testing-library/react';
import { ClearFilters } from '../ClearFilters';
import { MantineProvider } from '@mantine/core';

describe('ClearFilters', () => {

    const renderWithProviders = (ui: React.ReactNode) => {
        render(<MantineProvider>{ui}</MantineProvider>)
    }

    it('should render clear filters button', () => {
        renderWithProviders(<ClearFilters onClear={() => {}} hasActiveFilters={true} />)

        expect(screen.getByText('Clear filters')).toBeInTheDocument()
    })

    it('should not render clear filters button when no active filters', () => {
        renderWithProviders(<ClearFilters onClear={() => {}} hasActiveFilters={false} />)

        expect(screen.queryByText('Clear Filters')).not.toBeInTheDocument()
    })

    it('should call onClear when clear filters button is clicked', () => {
        const onClear = jest.fn()
        renderWithProviders(<ClearFilters onClear={onClear} hasActiveFilters={true} />)

        fireEvent.click(screen.getByText('Clear filters'))

        expect(onClear).toHaveBeenCalled()
    })
})