import {useCallback} from 'react';
import ToDoComponent from './ToDoComponent';
import {ToDoItemType, ToDoListInterface} from '../interfaces/types';

const ToDoList = ({
  listData,
  fetchData,
  onDelete,
  onClickDone,
}: ToDoListInterface) => {
  const renderItem = useCallback(
    (id: string | number) => {
      const toDoItem: ToDoItemType = fetchData(id);
      return (
        <ToDoComponent
          key={id}
          toDoItem={toDoItem}
          onClickDone={onClickDone}
          onClickDelete={onDelete}
        />
      );
    },
    [fetchData, onClickDone, onDelete],
  );
  return (
    <ul style={{padding: 0}}>{listData.map((id: string) => renderItem(id))}</ul>
  );
};

export default ToDoList;
