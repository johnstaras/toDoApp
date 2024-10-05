import {useCallback, useEffect, useReducer} from 'react';
import {initialState, toDoReducer} from '../reducers/toDoReducer';
import {ReducerActions} from '../constants/reducerActions';
import {TO_DO_ENDPOINT, TO_DO_ENDPOINT_DELETE} from '../constants/apiConstants';
import HomePageView from '../components/HomePageView';

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
  const onPressFilter = (pressedFilter: string) => {
    dispatch({type: ReducerActions.CHANGE_FILTER, filter: pressedFilter});
  };
  const fetchData = useCallback((id: string) => state.entities[id], [state]);

  const onDelete = useCallback((id: string) => {
    if (state.entities[id].isLocal) {
      // handle new todos that are not added in backend.
      dispatch({type: ReducerActions.DELETE, id});
      return;
    }

    dispatch({type: ReducerActions.SET_LOADER});

    fetch(`${TO_DO_ENDPOINT_DELETE}${id}`, {method: 'DELETE'})
      .then((result) => result.json())
      .then(
        (result) => {
          dispatch({type: ReducerActions.DELETE, id});
        },
        (error) => {
          dispatch({type: ReducerActions.SET_ERROR});
        },
      );
  }, []);

  const onClickDone = useCallback((payload: object) => {
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

  const onClickAdd = useCallback((payload: object) => {
    dispatch({type: ReducerActions.ADD, response: payload});
  }, []);

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
    />
  );
};

export default HomePageHOC;
