import {useCallback} from 'react';
import {Checkbox} from '@mui/material';
import './ToDoComponent.css';

const ToDoComponent = ({toDoItem, onClickDone, onClickDelete}) => {
  const {title, id, completed} = toDoItem;

  const onChangeDone = useCallback(() => {
    onClickDone({...toDoItem, completed: !completed});
  }, [id]);

  const onPressDelete = useCallback(() => {
    onClickDelete(id);
  }, [id]);

  return (
    <li
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
        }}
      >
        <Checkbox
          checked={completed}
          onChange={onChangeDone}
          inputProps={{'aria-label': 'controlled'}}
        />
        <p>{title}</p>
      </div>
      <Checkbox
        checked={false}
        onChange={onPressDelete}
        inputProps={{'aria-label': 'controlled'}}
      />
    </li>
  );
};

export default ToDoComponent;
