import { createStore } from 'zustand/vanilla';
import {TodoStore, TodoState, ToDoList } from './store.types';

export const defaultInitState: TodoState = {
  count: 0,
  list: [{
    todos: [{
      content: '',
      completed: false,
    }],
    name: 'Список дел'
  }],
};

export const initTodoStore = (): TodoState => {
  return defaultInitState;
};

export const createTodoStore = (
  initState: TodoState = defaultInitState,
) => {
  return createStore<TodoStore>()((set) => ({
    ...initState,
    addList: () => set((state) => ({
      ...state,
      list: [
        ...state.list,
        {
          name: 'Новый список',
          todos: [{
            content: '',
            completed: false,
          }],
        }],
    })),
    updateList: (id: number, newList: ToDoList) => set((state) => {
      const newState = {
        ...state,
        list: [...state.list],
      };
      newState.list[id] = {
        ...newList,
      };

      return newState;
    }),
    removeList: () => set((state) => ({
      ...state,
      // to be continued...
    })),
  }))
};
