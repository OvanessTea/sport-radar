import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { Matches } from '../Matches';
import { mockMatches } from '@/__mocks__/mockMatches';

jest.mock('@/helpers/transform/date.transform', () => ({
    dateTransform: jest.fn((date: string) => `transformed-${date}`)
}));

jest.mock('@/components/not-found/NotFound', () => ({
    NotFound: () => <div data-testid="not-found">No matches found</div>
}));

describe('Matches', () => {
    const renderWithProviders = (ui: React.ReactNode) => {
        render(
            <MantineProvider>
                {ui}
            </MantineProvider>
        )
    }

    it('should render matches table when matches are provided', () => {
        renderWithProviders(<Matches matches={mockMatches} />);

        // Check if table headers are rendered
        expect(screen.getByText('Start Time')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByText('Home Team')).toBeInTheDocument();
        expect(screen.getByText('Away Team')).toBeInTheDocument();
        expect(screen.getByText('Home Score')).toBeInTheDocument();
        expect(screen.getByText('Away Score')).toBeInTheDocument();

        // Check if matches are rendered
        expect(screen.getByText('transformed-2022-02-06T03:10:38Z')).toBeInTheDocument();
        expect(screen.getAllByText('Completed')).toHaveLength(3); // 3 matches with status COMPLETED
        expect(screen.getByText('Sacramento Kings')).toBeInTheDocument();
        expect(screen.getByText('Oklahoma City Thunder')).toBeInTheDocument();
        expect(screen.getByText('113')).toBeInTheDocument();
        expect(screen.getByText('103')).toBeInTheDocument();
    });

    it('should render NotFound component when no matches are provided', () => {
        renderWithProviders(<Matches matches={[]} />);

        expect(screen.getByTestId('not-found')).toBeInTheDocument();
        expect(screen.getByText('No matches found')).toBeInTheDocument();
    });

    it('should format status correctly', () => {
        renderWithProviders(<Matches matches={mockMatches} />);

        expect(screen.getAllByText('Completed')).toHaveLength(3);
        expect(screen.getAllByText('Live')).toHaveLength(1);
    });

    it('should handle matches with missing scores', () => {
        renderWithProviders(<Matches matches={mockMatches} />)

        const dashElements = screen.getAllByText('-')
        expect(dashElements).toHaveLength(2)
    })


    it('should render correct number of table rows', () => {
        renderWithProviders(<Matches matches={mockMatches} />)

        const tableRows = screen.getAllByRole('row')
        expect(tableRows).toHaveLength(6) // 1 header row + 5 data rows
    })
});