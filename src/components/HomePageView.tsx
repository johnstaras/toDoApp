import AddToDo from '../components/AddToDo';
import SearchBox from '../components/SearchBox';
import FilterOptions from '../components/FilterOptions';
import ToDoList from '../components/ToDoList';
import {CircularProgress} from '@mui/material';

const HomePageView = ({
  activeFilter,
  onPressFilter,
  listData,
  fetchData,
  onDelete,
  onClickDone,
  onClickAdd,
  isLoading,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 900,
      }}
    >
      <AddToDo onClickAdd={onClickAdd}/>
      <SearchBox />
      <FilterOptions
        activeFilter={activeFilter}
        onPressFilter={onPressFilter}
      />
      {isLoading ? (
        <CircularProgress  />
      ) : (
        <ToDoList
          listData={listData}
          fetchData={fetchData}
          onDelete={onDelete}
          onClickDone={onClickDone}
        />
      )}
    </div>
  );
};

export default HomePageView;
