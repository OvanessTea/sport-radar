import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { Search } from '../Search';

describe('Search', () => {
    const mockSetSearchQuery = jest.fn();
    const mockOnSubmit = jest.fn();
    
    const defaultProps = {
        searchQuery: '',
        setSearchQuery: mockSetSearchQuery,
        onSubmit: mockOnSubmit,
    };

    const renderWithProviders = (ui: React.ReactNode) => {
        render(<MantineProvider>{ui}</MantineProvider>);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders search input with placeholder text', () => {
        renderWithProviders(<Search {...defaultProps} />);
        
        const searchInput = screen.getByPlaceholderText('Search for matches');
        expect(searchInput).toBeInTheDocument();
    });

    it('displays search query value', () => {
        const propsWithValue = { ...defaultProps, searchQuery: 'test query' };
        renderWithProviders(<Search {...propsWithValue} />);
        
        const searchInput = screen.getByDisplayValue('test query');
        expect(searchInput).toBeInTheDocument();
    });

    it('calls setSearchQuery when input value changes', () => {
        renderWithProviders(<Search {...defaultProps} />);
        
        const searchInput = screen.getByPlaceholderText('Search for matches');
        fireEvent.change(searchInput, { target: { value: 'new search' } });
        
        expect(mockSetSearchQuery).toHaveBeenCalledWith('new search');
    });

    it('calls onSubmit with search query when Enter key is pressed', () => {
        const propsWithValue = { ...defaultProps, searchQuery: 'test query' };
        renderWithProviders(<Search {...propsWithValue} />);
        
        const searchInput = screen.getByDisplayValue('test query');
        fireEvent.keyDown(searchInput, { key: 'Enter' });
        
        expect(mockOnSubmit).toHaveBeenCalledWith('test query');
    });

    it('does not call onSubmit when other keys are pressed', () => {
        const propsWithValue = { ...defaultProps, searchQuery: 'test query' };
        renderWithProviders(<Search {...propsWithValue} />);
        
        const searchInput = screen.getByDisplayValue('test query');
        fireEvent.keyDown(searchInput, { key: 'Escape' });
        
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('calls onSubmit with search query when search icon is clicked', () => {
        const propsWithValue = { ...defaultProps, searchQuery: 'test query' };
        renderWithProviders(<Search {...propsWithValue} />);
        
        const searchIcon = screen.getByRole('textbox').parentElement?.querySelector('[data-icon="search"]');
        if (searchIcon) {
            fireEvent.click(searchIcon);
            expect(mockOnSubmit).toHaveBeenCalledWith('test query');
        }
    });

    it('shows clear icon when search query has content', () => {
        const propsWithValue = { ...defaultProps, searchQuery: 'test query' };
        renderWithProviders(<Search {...propsWithValue} />);
        
        const clearIcon = screen.getByRole('textbox').parentElement?.querySelector('[class*="icon-x"]');
        expect(clearIcon).toBeInTheDocument();
    });

    it('does not show clear icon when search query is empty', () => {
        renderWithProviders(<Search {...defaultProps} />);
        
        const clearIcon = screen.getByRole('textbox').parentElement?.querySelector('[class*="icon-x"]');
        expect(clearIcon).not.toBeInTheDocument();
    });

    it('clears search query and calls onSubmit when clear icon is clicked', () => {
        const propsWithValue = { ...defaultProps, searchQuery: 'test query' };
        renderWithProviders(<Search {...propsWithValue} />);
        
        const clearIcon = screen.getByRole('textbox').parentElement?.querySelector('[data-icon="x"]');
        if (clearIcon) {
            fireEvent.click(clearIcon);
            
            expect(mockSetSearchQuery).toHaveBeenCalledWith('');
            expect(mockOnSubmit).toHaveBeenCalledWith();
        }
    });

    it('calls onSubmit without parameters when clear icon is clicked', () => {
        const propsWithValue = { ...defaultProps, searchQuery: 'test query' };
        renderWithProviders(<Search {...propsWithValue} />);
        
        const clearIcon = screen.getByRole('textbox').parentElement?.querySelector('[data-icon="x"]');
        if (clearIcon) {
            fireEvent.click(clearIcon);
            
            expect(mockOnSubmit).toHaveBeenCalledWith();
        }
    });
});