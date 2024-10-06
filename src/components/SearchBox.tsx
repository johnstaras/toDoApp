import {TextField} from '@mui/material';
import {useEffect, useState} from 'react';
import {SearchBoxInterface} from '../interfaces/types';

const SearchBox = ({onSearchChange}: SearchBoxInterface) => {
  const [debouncedTerm, setDebouncedTerm] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => onSearchChange(debouncedTerm), 300);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  return (
    <TextField
      value={debouncedTerm}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setDebouncedTerm(event.target.value);
      }}
      type='text'
      placeholder={'I am looking for...'}
      style={{width: '100%'}}
    />
  );
};

export default SearchBox;
