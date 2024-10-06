import {AlertInfo, ToDoItemType} from './types';

export interface HomePageViewInterface {
  activeFilter: string;
  onPressFilter: (filter: string) => void;
  listData: Array<string>;
  fetchData: (id: string | number) => ToDoItemType;
  onDelete: (id: string | number) => void;
  onClickDone: (payload: ToDoItemType) => void;
  onClickAdd: (payload: ToDoItemType) => void;
  isLoading: boolean;
  onSearchChange: (searchPhrase: string) => void;
  alertInfo: AlertInfo;
}
