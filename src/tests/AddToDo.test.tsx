// src/components/AddToDo.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddToDo from '../components/AddToDo';

describe('AddToDo Component', () => {
  const mockOnClickAdd = jest.fn();

  beforeEach(() => {
    render(<AddToDo onClickAdd={mockOnClickAdd} />);
  });

  test('renders input field and button', () => {
    expect(screen.getByPlaceholderText('I want to...')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  test('button is disabled when input field is empty', () => {
    expect(screen.getByText('Create')).toBeDisabled();
  });

  test('button is enabled when input field has text', () => {
    fireEvent.change(screen.getByPlaceholderText('I want to...'), { target: { value: 'New Task' } });
    expect(screen.getByText('Create')).toBeEnabled();
  });

  test('calls onClickAdd with correct arguments when button is clicked', () => {
    const input = screen.getByPlaceholderText('I want to...');
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText('Create'));

    expect(mockOnClickAdd).toHaveBeenCalledWith({
      title: 'New Task',
      id: 'New Task',
      completed: false,
      isLocal: true,
    });
    expect(input).toHaveValue('');
  });
});