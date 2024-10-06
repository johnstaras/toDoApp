import {Alert, CircularProgress, Snackbar} from '@mui/material';
import AddToDo from '../components/AddToDo';
import SearchBox from '../components/SearchBox';
import FilterOptions from '../components/FilterOptions';
import ToDoList from '../components/ToDoList';
import {HomePageViewInterface} from '../interfaces/HomePageView';
import './HomePageView.css';

const HomePageView = ({
  activeFilter,
  onPressFilter,
  listData,
  fetchData,
  onDelete,
  onClickDone,
  onClickAdd,
  isLoading,
  onSearchChange,
  alertInfo,
}: HomePageViewInterface) => {
  return (
    <div className='container'>
      <AddToDo onClickAdd={onClickAdd} />
      <SearchBox onSearchChange={onSearchChange} />
      <FilterOptions
        activeFilter={activeFilter}
        onPressFilter={onPressFilter}
      />
      {isLoading ? (
        <div className='loader'>
          <CircularProgress />
        </div>
      ) : (
        <ToDoList
          listData={listData}
          fetchData={fetchData}
          onDelete={onDelete}
          onClickDone={onClickDone}
        />
      )}
      <Snackbar
        open={!!alertInfo.message}
        autoHideDuration={2000}
        onClose={alertInfo.onClose}
      >
        <Alert
          severity={alertInfo.severity}
          variant='filled'
          sx={{width: '100%'}}
        >
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HomePageView;
