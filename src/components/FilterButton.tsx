import {useCallback} from 'react';

const FilterButton = ({activeFilter, displayText, onPressFilter}) => {
  const onClick = useCallback(() => {
    onPressFilter(displayText);
  }, [displayText]);
  return (
    <p
      onClick={onClick}
      style={{
        paddingRight: 10,
        textDecoration: activeFilter === displayText ? 'underline' : '',
      }}
    >
      {displayText}
    </p>
  );
};

export default FilterButton;
