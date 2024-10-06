import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import ToDoList from '../components/ToDoList';
import {ToDoComponentInterface, ToDoItemType} from '../interfaces/types';

// Mock ToDoComponent
jest.mock(
  '../components/ToDoComponent',
  () =>
    ({toDoItem, onClickDone, onClickDelete}: ToDoComponentInterface) =>
      (
        <div>
          <span>{toDoItem.title}</span>
          <button onClick={() => onClickDone(toDoItem)}>Done</button>
          <button onClick={() => onClickDelete(toDoItem.id)}>Delete</button>
        </div>
      ),
);

describe('ToDoList Component', () => {
  const fetchData = jest.fn(
    (id) => ({id, title: `Item ${id}`} as ToDoItemType),
  );
  const onDelete = jest.fn();
  const onClickDone = jest.fn();
  const listData = ['1', '2', '3'];

  it('renders ToDoComponent for each item in listData', () => {
    render(
      <ToDoList
        listData={listData}
        fetchData={fetchData}
        onDelete={onDelete}
        onClickDone={onClickDone}
      />,
    );

    listData.forEach((id) => {
      expect(screen.getByText(`Item ${id}`)).toBeInTheDocument();
    });
  });

  it('calls onClickDone when Done button is clicked', () => {
    render(
      <ToDoList
        listData={listData}
        fetchData={fetchData}
        onDelete={onDelete}
        onClickDone={onClickDone}
      />,
    );

    const doneButtons = screen.getAllByText('Done');
    doneButtons.forEach((button) => {
      fireEvent.click(button);
    });

    expect(onClickDone).toHaveBeenCalledTimes(listData.length);
  });

  it('calls onDelete when Delete button is clicked', () => {
    render(
      <ToDoList
        listData={listData}
        fetchData={fetchData}
        onDelete={onDelete}
        onClickDone={onClickDone}
      />,
    );

    const deleteButtons = screen.getAllByText('Delete');
    deleteButtons.forEach((button) => {
      fireEvent.click(button);
    });

    expect(onDelete).toHaveBeenCalledTimes(listData.length);
  });
});
