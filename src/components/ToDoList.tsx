import {useCallback} from 'react';
import ToDoComponent from './ToDoComponent';

const ToDoList = ({listData, fetchData, onDelete, onClickDone}) => {
  const renderItem = useCallback((id: string) => {
    const toDoItem = fetchData(id);
    return (
      <ToDoComponent
        key={id}
        toDoItem={toDoItem}
        onClickDone={onClickDone}
        onClickDelete={onDelete}
      />
    );
  }, [fetchData]);
  return <ul>{listData.map((id: string) => renderItem(id))}</ul>;
};

export default ToDoList;
