import {filterArray, Filters} from '../constants/filters';
import {ReducerActions} from '../constants/reducerActions';
import {ActionType, InitialState} from '../interfaces/types';

export const toDoReducer = (state: InitialState, action: ActionType) => {
  const actionDetermine = {
    [ReducerActions.SET_ITEMS]: () => {
      if (!action || !action.results || action.results.length < 0) {
        return {...state, hasError: true};
      }
      let entities = {};
      let idsCompleted = [];
      let idsToDo = [];
      const idsAll = action.results.map((item) => {
        entities = {...entities, [item.id]: item};
        if (item.completed) {
          idsCompleted = [...idsCompleted, item.id];
        } else {
          idsToDo = [...idsToDo, item.id];
        }
        return item.id;
      });
      return {
        ...state,
        entities,
        idsAll,
        filteredIds: idsAll,
        isLoading: false,
        idsToDo,
        idsCompleted,
      };
    },
    [ReducerActions.ADD]: () => {
      return {
        ...state,
        isLoading: false,
        idsAll: [action.response.id, ...state.idsAll],
        idsToDo: [action.response.id, ...state.idsToDo],
        filteredIds: [action.response.id, ...state.filteredIds],
        entities: {
          ...state.entities,
          [action.response.id]: {
            ...action.response,
          },
        },
      };
    },
    [ReducerActions.CHANGE]: () => {
      return {
        ...state,
        isLoading: false,
        entities: {
          ...state.entities,
          [action.response.id]: {
            ...action.response,
          },
        },
        // idsCompleted: state.idsCompleted.filter((id) => action.id !== id),
        // idsToDo: state.idsToDo.filter((id) => action.id !== id), // check
        // filteredIds: state.filteredIds.filter((id) => action.id !== id),
      };
    },
    [ReducerActions.DELETE]: () => {
      return {
        ...state,
        isLoading: false,
        idsAll: state.idsAll.filter((id) => action.id !== id),
        idsCompleted: state.idsCompleted.filter((id) => action.id !== id),
        idsToDo: state.idsToDo.filter((id) => action.id !== id),
        filteredIds: state.filteredIds.filter((id) => action.id !== id),
      };
    },
    [ReducerActions.CHANGE_FILTER]: () => {
      return {
        ...state,
        activeFilterChip: action.filter,
        filteredIds: state[filterArray[action.filter]].filter((id: string) =>
          state.entities[id].title.includes(state.searchPhrase),
        ),
      };
    },
    [ReducerActions.SET_LOADER]: () => {
      return {...state, isLoading: true};
    },
    [ReducerActions.SET_ERROR]: () => {
      return {...state, hasError: true, isLoading: false};
    },
  };
  if (actionDetermine[action.type]) {
    return actionDetermine[action.type]();
  }
  console.log('Action not found', action.type);
  return {...state};
};

export const initialState: InitialState = {
  idsAll: [],
  idsCompleted: [],
  idsToDo: [],
  filteredIds: [],
  entities: {},
  activeFilterChip: Filters.ALL,
  searchPhrase: '',
  isLoading: true,
  hasError: false,
};
