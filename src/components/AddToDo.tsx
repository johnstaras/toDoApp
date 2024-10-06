import {Button, TextField} from '@mui/material';
import {useState} from 'react';
import { AddToDoInterface } from '../interfaces/types';
import './AddToDo.css'

const AddToDo : React.FC<AddToDoInterface>  = props => {
  const {onClickAdd} = props
  const [fieldDisplayValue, setFieldDisplayValue] = useState('');
  const onClickPressed = () => {
    onClickAdd({
      title: fieldDisplayValue,
      id: fieldDisplayValue,
      completed: false,
      isLocal: true,
    });
    setFieldDisplayValue('');
  };
  return (
    <div className='containerAddNew'>
      <TextField
        data-testid={'check'}
        value={fieldDisplayValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setFieldDisplayValue(event.target.value);
        }}
        type='text'
        placeholder={'I want to...'}
        style={{width: '100%'}}
      />
      <div style={{paddingLeft: 20}} />
      <Button
        disabled={fieldDisplayValue === ''}
        onClick={onClickPressed}
        variant='outlined'
      >
        Create
      </Button>
    </div>
  );
};

export default AddToDo;
