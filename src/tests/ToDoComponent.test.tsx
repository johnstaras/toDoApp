// src/components/ToDoComponent.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToDoComponent from '../components/ToDoComponent';

describe('ToDoComponent', () => {
  const mockOnClickDone = jest.fn();
  const mockOnClickDelete = jest.fn();
  const toDoItem = {
    title: 'Test Task',
    id: '1',
    completed: false,
  };

  const renderComponent = (item = toDoItem) => {
    render(
      <ToDoComponent
        toDoItem={item}
        onClickDone={mockOnClickDone}
        onClickDelete={mockOnClickDelete}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with correct title', () => {
    renderComponent();
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  test('checkbox is checked when completed is true', () => {
    renderComponent({ ...toDoItem, completed: true });
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('checkbox is not checked when completed is false', () => {
    renderComponent();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  test('calls onClickDone with correct argument when checkbox is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockOnClickDone).toHaveBeenCalledWith({
      ...toDoItem,
      completed: true,
    });
  });

  test('calls onClickDelete with correct argument when delete button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByLabelText('delete'));
    expect(mockOnClickDelete).toHaveBeenCalledWith('1');
  });
});