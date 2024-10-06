// src/components/FilterButton.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterButton from '../components/FilterButton';

describe('FilterButton Component', () => {
  const mockOnPressFilter = jest.fn();

  beforeEach(() => {
    render(
      <FilterButton
        activeFilter="All"
        displayText="All"
        onPressFilter={mockOnPressFilter}
      />
    );
  });

  test('renders with correct text', () => {
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  test('text is underlined when filter is active', () => {
    expect(screen.getByText('All')).toHaveStyle('text-decoration: underline');
  });

  test('text is not underlined when filter is not active', () => {
    render(
      <FilterButton
        activeFilter="Completed"
        displayText="All"
        onPressFilter={mockOnPressFilter}
      />
    );
    const elements = screen.getAllByText('All');
    expect(elements[1]).not.toHaveStyle('text-decoration: underline');
  });

  test('calls onPressFilter with correct argument when clicked', () => {
    fireEvent.click(screen.getByText('All'));
    expect(mockOnPressFilter).toHaveBeenCalledWith('All');
  });
});