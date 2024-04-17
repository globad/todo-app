import { createStore } from 'zustand/vanilla';
import {TodoStore, TodoState, ToDoList } from './store.types';

export const defaultInitState: TodoState = {
  isDraggable: false,
  list: [{
    todos: [{
      content: '',
      completed: false,
    }],
    name: 'Список дел'
  }],
};

export const initTodoStore = (): TodoState => {
  if (typeof window !== 'undefined') {
    const savedState = window.localStorage.getItem('state');
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return defaultInitState;
};

const saveStore = (state: TodoState) => {
  if (typeof window !== 'undefined') {
    const savedState = JSON.stringify(state);
    window.localStorage.setItem('state', savedState);
  }
}

export const createTodoStore = (
  initState: TodoState = defaultInitState,
) => {
  return createStore<TodoStore>()((set) => ({
    ...initState,
    addList: () => set((state) => {
      const newState = {
        ...state,
        list: [
          ...state.list,
          {
            name: 'Новый список',
            todos: [{
              content: '',
              completed: false,
            }],
          }
        ],
      };

      saveStore(newState);
      return newState;
    }),
    updateList: (id: number, newList: ToDoList) => set((state) => {
      const newState = {
        ...state,
        list: [...state.list],
      };
      newState.list[id] = {
        ...newList,
      };

      saveStore(newState);
      return newState;
    }),
    removeList: (listId: number) => set((state) => {
      const newState = {
        ...state,
        list: [...state.list],
      };
      newState.list.splice(listId, 1);
      saveStore(newState);
      return newState;
    }),
    toggleDraggable: () => set((state) => {
      const newState = {
        ...state,
        isDraggable: !state.isDraggable,
      }

      saveStore(newState);
      return newState;
    }),
  }))
};
