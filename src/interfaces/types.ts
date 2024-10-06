import {OverridableStringUnion} from '@mui/types';

export type AlertColor = 'success' | 'info' | 'warning' | 'error';

export interface ActionType {
  type: string;
  response?: ToDoItemType;
  id?: string;
  filter?: string;
  searchPhrase?: string;
  results?: any;
}

export interface ToDoItemType {
  completed: boolean;
  title: string;
  id: number | string;
  userId?: string;
  isLocal?: boolean;
}

export interface InitialState {
  idsAll: Array<string | number>;
  idsCompleted: Array<string | number>;
  idsToDo: Array<string | number>;
  filteredIds: Array<string | number>;
  entities: object;
  activeFilterChip: string;
  searchPhrase: string;
  isLoading: boolean;
  hasError: boolean;
  alertInfo: AlertInfo;
}

export interface AlertInfo {
  severity: any; // OverridableStringUnion<AlertColor> | string | undefined;
  message: string;
  onClose?: () => void;
}

export interface AddToDoInterface {
  onClickAdd: (payload: ToDoItemType) => void;
}

export interface SearchBoxInterface {
  onSearchChange: (id: string) => void;
}

export interface ToDoListInterface {
  listData: Array<string>;
  fetchData: (id: string | number) => ToDoItemType;
  onDelete: (id: string | number) => void;
  onClickDone: (payload: ToDoItemType) => void;
}

export interface ToDoComponentInterface {
  toDoItem: ToDoItemType;
  onClickDelete: (id: string | number) => void;
  onClickDone: (payload: ToDoItemType) => void;
  
}
