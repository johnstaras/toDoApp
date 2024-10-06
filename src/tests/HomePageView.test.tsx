// src/components/HomePageView.test.tsx
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePageView from '../components/HomePageView';
import {HomePageViewInterface} from '../interfaces/HomePageView';
import {ToDoItemType} from '../interfaces/types';

describe('HomePageView Component', () => {
  const entities: {[key: string | number]: ToDoItemType} = {
    '1': {
      id: '1',
      title: 'Task 1',
      completed: false,
    },
    '2': {
      id: '2',
      title: 'Task 2',
      completed: false,
    },
  };

  const mockOnPressFilter = jest.fn();
  const mockFetchData = (id: string | number) => {
    return entities[id];
  };
  const mockOnDelete = jest.fn();
  const mockOnClickDone = jest.fn();
  const mockOnClickAdd = jest.fn();
  const mockOnSearchChange = jest.fn();
  const mockOnClose = jest.fn();

  const listData: Array<string> = ['1', '2'];

  const alertInfo = {
    message: 'Test Alert',
    severity: 'success',
    onClose: mockOnClose,
  };

  const defaultProps: HomePageViewInterface = {
    activeFilter: 'all',
    onPressFilter: mockOnPressFilter,
    listData: listData,
    fetchData: mockFetchData,
    onDelete: mockOnDelete,
    onClickDone: mockOnClickDone,
    onClickAdd: mockOnClickAdd,
    isLoading: false,
    onSearchChange: mockOnSearchChange,
    alertInfo: alertInfo,
  };

  beforeEach(() => {
    render(<HomePageView {...defaultProps} />);
  });

  test('renders AddToDo, SearchBox, and FilterOptions components', () => {
    expect(screen.getByPlaceholderText('I want to...')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('I am looking for...'),
    ).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  test('renders CircularProgress when isLoading is true', () => {
    render(<HomePageView {...defaultProps} isLoading={true} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders ToDoList when isLoading is false', () => {
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('renders Snackbar and Alert with correct message and severity', () => {
    expect(screen.getByText('Test Alert')).toBeInTheDocument();
    expect(
      screen.getByText('Test Alert').closest('.MuiAlert-filledSuccess'),
    ).toBeInTheDocument();
  });


});
