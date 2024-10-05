export interface ActionType {
  type: string;
  response?: ToDoItemType;
  id?: string;
  filter?: string;
}

export interface ToDoItemType {
  completed: boolean;
  title: string;
  id: number;
  userId: string;
}

export interface InitialState {
  idsAll: Array<string>;
  idsCompleted: Array<string>;
  idsToDo: Array<string>;
  filteredIds: Array<string>;
  entities: object;
  activeFilterChip: string;
  searchPhrase: string;
  isLoading: boolean;
  hasError: boolean;
}
