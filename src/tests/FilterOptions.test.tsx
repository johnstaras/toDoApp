// src/components/FilterOptions.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterOptions from '../components/FilterOptions';
import { Filters } from '../constants/filters';

describe('FilterOptions Component', () => {
  const mockOnPressFilter = jest.fn();

  beforeEach(() => {
    render(
      <FilterOptions activeFilter={Filters.ALL} onPressFilter={mockOnPressFilter} />
    );
  });

  test('renders all filter buttons', () => {
    expect(screen.getByText(Filters.ALL)).toBeInTheDocument();
    expect(screen.getByText(Filters.COMPLETED)).toBeInTheDocument();
    expect(screen.getByText(Filters.TODO)).toBeInTheDocument();
  });

  test('calls onPressFilter with correct filter when a button is clicked', () => {
    fireEvent.click(screen.getByText(Filters.ALL));
    expect(mockOnPressFilter).toHaveBeenCalledWith(Filters.ALL);

    fireEvent.click(screen.getByText(Filters.COMPLETED));
    expect(mockOnPressFilter).toHaveBeenCalledWith(Filters.COMPLETED);

    fireEvent.click(screen.getByText(Filters.TODO));
    expect(mockOnPressFilter).toHaveBeenCalledWith(Filters.TODO);
  });
});