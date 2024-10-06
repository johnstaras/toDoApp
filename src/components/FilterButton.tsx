import {useCallback} from 'react';

interface FilterButtonProps {
  activeFilter: string;
  displayText: string;
  onPressFilter: (filter: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({activeFilter, displayText, onPressFilter}) => {
  const onClick = useCallback(() => {
    onPressFilter(displayText);
  }, [displayText]);
  return (
    <p
      onClick={onClick}
      style={{
        paddingRight: 10,
        textDecoration: activeFilter === displayText ? 'underline' : '',
        cursor: 'pointer',
      }}
    >
      {displayText}
    </p>
  );
};

export default FilterButton;
