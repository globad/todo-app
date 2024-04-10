import { ToDo } from '@/stores/store.types';

export function hasEmpty(list: ToDo[]) {
  return list.some((item) => !item.content);
}

export function isCompleted(list: ToDo[]) {
  return list.every((item) => item.completed);
}
