import {Button, TextField} from '@mui/material';
import {useState} from 'react';

const AddToDo = ({onClickAdd}) => {
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
    <div style={{flex: 1, display: 'flex', paddingBottom: 20}}>
      <TextField
        value={fieldDisplayValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setFieldDisplayValue(event.target.value);
        }}
        type='text'
        placeholder={'I want to...'}
        style={{width: '100%'}}
      />
      <div style={{paddingLeft: 20}} />
      <Button onClick={onClickPressed} variant='outlined'>
        Create
      </Button>
    </div>
  );
};

export default AddToDo;
