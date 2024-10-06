import {useCallback, useEffect, useReducer} from 'react';
import HomePageView from '../components/HomePageView';
import {initialState, toDoReducer} from '../reducers/toDoReducer';
import {ReducerActions} from '../constants/reducerActions';
import {TO_DO_ENDPOINT, TO_DO_ENDPOINT_DELETE} from '../constants/apiConstants';
import {ToDoItemType} from '../interfaces/types';

const HomePageHOC = () => {
  const [state, dispatch] = useReducer(toDoReducer, initialState);
  useEffect(() => {
    fetch(TO_DO_ENDPOINT)
      .then((result) => result.json())
      .then(
        (result) => {
          dispatch({type: ReducerActions.SET_ITEMS, results: result});
        },
        (error) => {
          dispatch({type: ReducerActions.SET_ERROR});
        },
      );
  }, []);

  const onPressFilter = useCallback((pressedFilter: string) => {
    dispatch({type: ReducerActions.CHANGE_FILTER, filter: pressedFilter});
  }, []);
  const fetchData = useCallback(
    (id: string | number) => state.entities[id],
    [state],
  );

  const onDelete = useCallback(
    (id: string) => {
      if (state.entities[id].isLocal) {
        // handle new todos that are not added in backend.
        dispatch({type: ReducerActions.DELETE, id});
        return;
      }
      dispatch({type: ReducerActions.SET_LOADER});
      fetch(`${TO_DO_ENDPOINT_DELETE}${id}`, {method: 'DELETE'})
        .then((result) => result.json())
        .then(
          () => {
            dispatch({type: ReducerActions.DELETE, id});
          },
          () => {
            dispatch({type: ReducerActions.SET_ERROR});
          },
        );
    },
    [state.entities],
  );

  const onClickDone = useCallback((payload: ToDoItemType) => {
    if (payload.isLocal) {
      // handle new todos that are not added in backend.
      dispatch({type: ReducerActions.CHANGE, response: payload});
      return;
    }
    dispatch({type: ReducerActions.SET_LOADER});
    fetch(`${TO_DO_ENDPOINT_DELETE}${payload.id}`, {
      body: JSON.stringify(payload),
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((result) => result.json())
      .then(
        (result) => {
          dispatch({type: ReducerActions.CHANGE, response: result});
        },
        (error) => {
          dispatch({type: ReducerActions.SET_ERROR});
        },
      );
  }, []);

  const onClickAdd = useCallback((payload: ToDoItemType) => {
    dispatch({type: ReducerActions.ADD, response: payload});
  }, []);

  const onSearchChange = useCallback((searchPhrase: string) => {
    dispatch({type: ReducerActions.CHANGE_SEARCH_TERM, searchPhrase});
  }, []);

  const alertInfo = {
    ...state.alertInfo,
    onClose: () => dispatch({type: ReducerActions.CLEAR_MESSAGE}),
  };

  return (
    <HomePageView
      activeFilter={state.activeFilterChip}
      onPressFilter={onPressFilter}
      listData={state.filteredIds}
      fetchData={fetchData}
      onDelete={onDelete}
      onClickDone={onClickDone}
      onClickAdd={onClickAdd}
      isLoading={state.isLoading}
      onSearchChange={onSearchChange}
      alertInfo={alertInfo}
    />
  );
};

export default HomePageHOC;
