export enum Filters {
  ALL = 'All',
  COMPLETED = 'Completed',
  TODO = 'ToDo',
}

export const filterArray = {
  [Filters.ALL]: 'idsAll',
  [Filters.COMPLETED]: 'idsCompleted',
  [Filters.TODO]: 'idsToDo',
};
