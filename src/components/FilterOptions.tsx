import {Filters} from '../constants/filters';
import FilterButton from './FilterButton';

interface FilterOptionsProps {
  activeFilter: string;
  onPressFilter: (filter: string) => void;
}

const FiltersOptions: React.FC<FilterOptionsProps> = ({activeFilter, onPressFilter}) => {
  return (
    <div style={{flexDirection: 'row', display: 'flex'}}>
      <FilterButton
        activeFilter={activeFilter}
        displayText={Filters.ALL}
        onPressFilter={onPressFilter}
      />
      <FilterButton
        activeFilter={activeFilter}
        displayText={Filters.COMPLETED}
        onPressFilter={onPressFilter}
      />
      <FilterButton
        activeFilter={activeFilter}
        displayText={Filters.TODO}
        onPressFilter={onPressFilter}
      />
    </div>
  );
};

export default FiltersOptions;
