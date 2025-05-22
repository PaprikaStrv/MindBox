export interface TodoItemType {
  id: string;
  text: string;
  completed: boolean;
}

export enum FilterEnum {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export type Filter = FilterEnum;
