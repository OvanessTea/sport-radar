import { fireEvent, render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { Sidebar } from '../Sidebar';
import { SportType } from '@/types/sport.type';
import { mockSports } from '@/__mocks__/mockSports';
import { useState } from 'react';

describe('Sidebar', () => {

    const TestComponent = ({ availableSports }: { availableSports: SportType[] }) => {
        const [selectedTab, setSelectedTab] = useState(availableSports[0]?.name || 'All');

        return (
            <Sidebar availableSports={availableSports} setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
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

    it('should handle selected tab', () => {
        renderWithProviders(<TestComponent availableSports={mockSports} />)

        expect(screen.getByText('Football').closest('button')).toHaveClass('selected', { exact: false });
        expect(screen.getByText('Basketball').closest('button')).not.toHaveClass('selected', { exact: false });

        fireEvent.click(screen.getByText('Basketball'))

        expect(screen.getByText('Football').closest('button')).not.toHaveClass('selected', { exact: false });
        expect(screen.getByText('Basketball').closest('button')).toHaveClass('selected', { exact: false });
        expect(screen.getByText('All').closest('button')).not.toHaveClass('selected', { exact: false });
    });

    it('should handle available sports', () => {
        const { rerender } = renderWithProviders(<TestComponent availableSports={mockSports} />)

        expect(screen.getByText('Football')).toBeInTheDocument();
        expect(screen.getByText('Basketball')).toBeInTheDocument();

        rerender(<MantineProvider><TestComponent availableSports={mockSports.slice(0, 2)} /></MantineProvider>);
        
        expect(screen.getByText('Football').closest('button')).toHaveClass('selected', { exact: false });
        expect(screen.getByText('Basketball').closest('button')).not.toHaveClass('selected', { exact: false });
    });

    it('should handle empty available sports', () => {
        renderWithProviders(<TestComponent availableSports={[]} />)

        expect(screen.queryByText('Football')).not.toBeInTheDocument();
        expect(screen.queryByText('Basketball')).not.toBeInTheDocument();

    });
})  