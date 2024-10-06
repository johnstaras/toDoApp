import {responseMessage} from '../constants/apiResponseInfo';
import {filterArray, Filters} from '../constants/filters';
import {ReducerActions} from '../constants/reducerActions';
import {toastType} from '../constants/toastTypes';
import {ActionType, InitialState, ToDoItemType} from '../interfaces/types';
import {searchOneTermOnOnePhrase} from '../utils/searchUtils';

export const toDoReducer = (state: InitialState, action: ActionType) => {
  const actionDetermine: {[key: string]: () => InitialState} = {
    [ReducerActions.SET_ITEMS]: () => {
      if (!action || !action.results || action.results.length < 0) {
        return {...state, hasError: true};
      }
      let entities = {};
      let idsCompleted: Array<string | number> = [];
      let idsToDo: Array<string | number> = [];
      const idsAll = action.results.map((item: ToDoItemType) => {
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
      if (!action.response) {
        return {...state, hasError: true};
      }
      if (state.idsAll.includes(action.response.id)) {
        return {
          ...state,
          alertInfo: {
            message: responseMessage.DUPLICATE_ITEM,
            severity: toastType.WARNING,
          },
        };
      }
      const idsAll = [action.response.id, ...state.idsAll];
      const idsToDo = [action.response.id, ...state.idsToDo];
      const filterArray = {
        [Filters.ALL]: idsAll,
        [Filters.COMPLETED]: state.idsCompleted,
        [Filters.TODO]: idsToDo,
      };
      const entities = {
        ...state.entities,
        [action.response.id]: {
          ...action.response,
        },
      };
      const filteredIds = filterArray[state.activeFilterChip].filter(
        (id: string | number) =>
          searchOneTermOnOnePhrase({
            phrase: entities[id].title,
            searchTerm: state.searchPhrase,
          }),
      );
      return {
        ...state,
        isLoading: false,
        idsAll: idsAll,
        idsToDo: idsToDo,
        filteredIds: filteredIds,
        entities: entities,
        alertInfo: {
          message: responseMessage.SUCCESS,
          severity: toastType.SUCCESS,
        },
      };
    },
    [ReducerActions.CHANGE]: () => {
      if (!action.response) {
        return {...state, hasError: true};
      }
      let idsCompleted;
      let idsToDo;
      const newEntities = {
        ...state.entities,
        [action.response.id]: {
          ...action.response,
        },
      };

      if (action.response?.completed) {
        idsCompleted = [action.response.id, ...state.idsCompleted];
        idsToDo = state.idsToDo.filter(
          (id: string | number) => id !== action.response.id,
        );
      }

      if (!action.response?.completed) {
        idsToDo = [action.response.id, ...state.idsToDo];
        idsCompleted = state.idsCompleted.filter(
          (id: string | number) => id !== action.response.id,
        );
      }
      const filterArray = {
        [Filters.ALL]: state.idsAll,
        [Filters.COMPLETED]: idsCompleted,
        [Filters.TODO]: idsToDo,
      };
      const filteredIds = filterArray[state.activeFilterChip].filter(
        (id: string | number) =>
          searchOneTermOnOnePhrase({
            phrase: state.entities[id].title,
            searchTerm: state.searchPhrase,
          }),
      );
      return {
        ...state,
        isLoading: false,
        entities: newEntities,
        idsCompleted: idsCompleted,
        idsToDo: idsToDo,
        filteredIds: filteredIds,
        alertInfo: {
          message: responseMessage.SUCCESS,
          severity: toastType.SUCCESS,
        },
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
        alertInfo: {
          message: responseMessage.SUCCESS,
          severity: toastType.SUCCESS,
        },
      };
    },
    [ReducerActions.CHANGE_FILTER]: () => {
      return {
        ...state,
        activeFilterChip: action.filter,
        filteredIds: state[filterArray[action.filter]].filter((id: string) =>
          searchOneTermOnOnePhrase({
            phrase: state.entities[id].title,
            searchTerm: state.searchPhrase,
          }),
        ),
      };
    },
    [ReducerActions.CHANGE_SEARCH_TERM]: () => {
      return {
        ...state,
        searchPhrase: action.searchPhrase,
        filteredIds: state[filterArray[state.activeFilterChip]].filter(
          (id: string) =>
            searchOneTermOnOnePhrase({
              phrase: state.entities[id].title,
              searchTerm: action.searchPhrase,
            }),
        ),
      };
    },
    [ReducerActions.SET_LOADER]: () => {
      return {...state, isLoading: true};
    },
    [ReducerActions.SET_ERROR]: () => {
      return {
        ...state,
        hasError: true,
        isLoading: false,
        alertInfo: {
          message: responseMessage.ERROR,
          severity: toastType.ERROR,
        },
      };
    },
    [ReducerActions.CLEAR_MESSAGE]: () => {
      return {
        ...state,
        hasError: false,
        alertInfo: {
          message: '',
          severity: '',
        },
      };
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
  alertInfo: {message: '', severity: ''},
};
