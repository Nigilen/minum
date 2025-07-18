import type { AsyncComponentLoader } from "vue";

export type TaskStatus = 'incoming' | 'day' | 'week';

export interface IColumn {
  id: number;
  task: string;
  status: TaskStatus;
  done: boolean;
  tag: string;
  important: boolean;
};

export interface MenuItem {
  name: string;
  path: string;
  alias: string;
  icon: AsyncComponentLoader;
  exact?: boolean;
};