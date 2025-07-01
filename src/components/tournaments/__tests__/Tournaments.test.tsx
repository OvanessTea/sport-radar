import { fireEvent, render, screen } from '@testing-library/react';
import { Tournaments } from '../Tournaments';
import { MantineProvider } from '@mantine/core';
import { mockTournaments } from '@/__mocks__/mockTournaments';
import { useState } from 'react';
import { TournamentType } from '@/types/tournament.type';

describe('Tournaments', () => {

    const TestComponent = ({ availableTournaments }: { availableTournaments: TournamentType[] }) => {
        const [selectedTournament, setSelectedTournament] = useState(
            availableTournaments.length > 0 ? availableTournaments[0] : {id: 99, name: 'all', sportId: 99}
        );
        
        return (
            <Tournaments 
                selectedTournament={selectedTournament} 
                setSelectedTournament={setSelectedTournament} 
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

    it('should handle selected tournament', () => {
        renderWithProviders(<TestComponent availableTournaments={mockTournaments} />)

        expect(screen.getByText('UEFA Champions league').closest('button')).toHaveClass('selected', { exact: false });
        expect(screen.getByText('NBA').closest('button')).not.toHaveClass('selected', { exact: false });
        expect(screen.getByText('NHL').closest('button')).not.toHaveClass('selected', { exact: false });

        fireEvent.click(screen.getByText('NBA'))

        expect(screen.getByText('UEFA Champions league').closest('button')).not.toHaveClass('selected', { exact: false });
        expect(screen.getByText('NBA').closest('button')).toHaveClass('selected', { exact: false });
        expect(screen.getByText('NHL').closest('button')).not.toHaveClass('selected', { exact: false });
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

        expect(screen.getByText('UEFA Champions league').closest('button')).toHaveClass('selected', { exact: false });
        expect(screen.getByText('NBA').closest('button')).not.toHaveClass('selected', { exact: false });
    });

    it('should handle empty available tournaments', () => {
        renderWithProviders(<TestComponent availableTournaments={[]} />)

        expect(screen.getByText('All')).toBeInTheDocument();
        expect(screen.queryByText('UEFA Champions league')).not.toBeInTheDocument();
        expect(screen.queryByText('NBA')).not.toBeInTheDocument();
        expect(screen.queryByText('NHL')).not.toBeInTheDocument();

        expect(screen.getByText('All').closest('button')).toHaveClass('selected', { exact: false });
    });
})