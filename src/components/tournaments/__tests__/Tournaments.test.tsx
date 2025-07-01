import { fireEvent, render, screen } from '@testing-library/react';
import { Tournaments } from '../Tournaments';
import { MantineProvider } from '@mantine/core';
import { mockTournaments } from '@/__mocks__/mockTournaments';
import { useState } from 'react';
import { TournamentType } from '@/types/tournament.type';

describe('Tournaments', () => {

    const TestComponent = ({ availableTournaments }: { availableTournaments: TournamentType[] }) => {
        const [selectedTournaments, setSelectedTournaments] = useState(
            availableTournaments.length > 0 ? [availableTournaments[0].id] : []
        );
        
        return (
            <Tournaments 
                selectedTournaments={selectedTournaments} 
                setSelectedTournaments={setSelectedTournaments} 
                availableTournaments={availableTournaments} 
            />
        );
    };

    const renderWithProviders = (ui: React.ReactNode) => {
        return render(<MantineProvider>{ui}</MantineProvider>)
    }

    it('should render tournament component', () => {
        renderWithProviders(<TestComponent availableTournaments={mockTournaments} />)

        expect(screen.getByText('UEFA Champions league')).toBeInTheDocument()
        expect(screen.getByText('NBA')).toBeInTheDocument()
        expect(screen.getByText('NHL')).toBeInTheDocument()
    });

    it('should handle selected tournaments', () => {
        renderWithProviders(<TestComponent availableTournaments={mockTournaments} />)

        expect(screen.getByText('UEFA Champions league').closest('.tab')).toHaveClass('selected');
        expect(screen.getByText('NBA').closest('.tab')).not.toHaveClass('selected');
        expect(screen.getByText('NHL').closest('.tab')).not.toHaveClass('selected');

        fireEvent.click(screen.getByText('NBA'))

        expect(screen.getByText('UEFA Champions league').closest('.tab')).toHaveClass('selected');
        expect(screen.getByText('NBA').closest('.tab')).toHaveClass('selected');
        expect(screen.getByText('NHL').closest('.tab')).not.toHaveClass('selected');
    });

    it('should handle available tournaments', () => {
        const { rerender } = renderWithProviders(<TestComponent availableTournaments={mockTournaments} />)

        expect(screen.getByText('UEFA Champions league')).toBeInTheDocument();
        expect(screen.getByText('NBA')).toBeInTheDocument();
        expect(screen.getByText('NHL')).toBeInTheDocument();

        rerender(<MantineProvider><TestComponent availableTournaments={mockTournaments.slice(0, 2)} /></MantineProvider>);

        expect(screen.getByText('UEFA Champions league')).toBeInTheDocument();
        expect(screen.getByText('NBA')).toBeInTheDocument();
        expect(screen.queryByText('NHL')).not.toBeInTheDocument();
    });

    it('should handle empty available tournaments', () => {
        renderWithProviders(<TestComponent availableTournaments={[]} />)

        expect(screen.queryByText('UEFA Champions league')).not.toBeInTheDocument();
        expect(screen.queryByText('NBA')).not.toBeInTheDocument();
        expect(screen.queryByText('NHL')).not.toBeInTheDocument();
        expect(screen.queryByText('All')).not.toBeInTheDocument();
    });
})