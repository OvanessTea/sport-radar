import { fireEvent, render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { Sidebar } from '../Sidebar';
import { SportType } from '@/types/sport.type';
import { mockSports } from '@/__mocks__/mockSports';
import { useState } from 'react';

describe('Sidebar', () => {

    const TestComponent = ({ availableSports }: { availableSports: SportType[] }) => {
        const [selectedTabs, setSelectedTabs] = useState(availableSports[0]?.name ? [availableSports[0].name] : []);

        return (
            <Sidebar availableSports={availableSports} setSelectedTabs={setSelectedTabs} selectedTabs={selectedTabs} />
        )
    }

    const renderWithProviders = (ui: React.ReactNode) => {
        return render(<MantineProvider>{ui}</MantineProvider>)
    };

    it('should render sidebar component', () => {
        renderWithProviders(<TestComponent availableSports={mockSports} />)

        expect(screen.getByText('Football')).toBeInTheDocument()
        expect(screen.getByText('Basketball')).toBeInTheDocument()
    });

    it('should handle selected tabs', () => {
        renderWithProviders(<TestComponent availableSports={mockSports} />)

        expect(screen.getByText('Football').closest('.tab')).toHaveClass('selected');
        expect(screen.getByText('Basketball').closest('.tab')).not.toHaveClass('selected');

        fireEvent.click(screen.getByText('Basketball'))

        expect(screen.getByText('Football').closest('.tab')).toHaveClass('selected');
        expect(screen.getByText('Basketball').closest('.tab')).toHaveClass('selected');
    });

    it('should handle available sports', () => {
        const { rerender } = renderWithProviders(<TestComponent availableSports={mockSports} />)

        expect(screen.getByText('Football')).toBeInTheDocument();
        expect(screen.getByText('Basketball')).toBeInTheDocument();
        expect(screen.getByText('Baseball')).toBeInTheDocument();

        rerender(<MantineProvider><TestComponent availableSports={mockSports.slice(0, 2)} /></MantineProvider>);
        
        expect(screen.getByText('Football')).toBeInTheDocument();
        expect(screen.getByText('Basketball')).toBeInTheDocument();
        expect(screen.queryByText('Baseball')).not.toBeInTheDocument();
    });

    it('should handle empty available sports', () => {
        renderWithProviders(<TestComponent availableSports={[]} />)

        expect(screen.queryByText('Football')).not.toBeInTheDocument();
        expect(screen.queryByText('Basketball')).not.toBeInTheDocument();

    });

    it('should clear selected tabs list when all tabs are deselected', () => {
        renderWithProviders(<TestComponent availableSports={mockSports} />)

        fireEvent.click(screen.getByText('Football'))

        expect(screen.getByText('Football').closest('.tab')).not.toHaveClass('selected');
        expect(screen.getByText('Basketball').closest('.tab')).not.toHaveClass('selected');

    })
})  