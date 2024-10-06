// src/components/SearchBox.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBox from '../components/SearchBox';

describe('SearchBox Component', () => {
  const mockOnSearchChange = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    render(<SearchBox onSearchChange={mockOnSearchChange} />);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders input field', () => {
    expect(screen.getByPlaceholderText('I am looking for...')).toBeInTheDocument();
  });

  test('calls onSearchChange with correct argument after debounce period', () => {
    const input = screen.getByPlaceholderText('I am looking for...');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.change(input, { target: { value: 'search term' } });

    mockOnSearchChange.mockClear();
    expect(mockOnSearchChange).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);

    expect(mockOnSearchChange).toHaveBeenCalledWith('search term');
  });
});