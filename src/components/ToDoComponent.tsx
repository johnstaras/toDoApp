import {useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import xIcon from '../assets/close_x.svg';
import {ToDoComponentInterface} from '../interfaces/types';
import './ToDoComponent.css';

const ToDoComponent = ({
  toDoItem,
  onClickDone,
  onClickDelete,
}: ToDoComponentInterface) => {
  const {title, id, completed} = toDoItem;

  const onChangeDone = useCallback(() => {
    onClickDone({...toDoItem, completed: !completed});
  }, [completed, onClickDone, toDoItem]);

  const onPressDelete = useCallback(() => {
    onClickDelete(id);
  }, [id, onClickDelete]);

  return (
    <li className='containerItemList'>
      <div className='checkBoxContainer'>
        <Checkbox
          checked={completed}
          onChange={onChangeDone}
          inputProps={{'aria-label': 'controlled'}}
        />
        <p>{title}</p>
      </div>
      <IconButton onClick={onPressDelete} aria-label='delete'>
        <img src={xIcon} alt='X icon' className='imageStyles' />
      </IconButton>
    </li>
  );
};

export default ToDoComponent;
