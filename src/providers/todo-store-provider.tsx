'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';

import { createTodoStore, initTodoStore } from '@/stores/todo-store';
import { type TodoStore } from '@/stores/store.types';

export const TodoStoreContext = createContext<StoreApi<TodoStore> | null>(null);

export interface TodoStoreProviderProps {
  children: ReactNode;
}

export const TodoStoreProvider = ({
  children,
}: TodoStoreProviderProps) => {
  const storeRef = useRef<StoreApi<TodoStore>>();
  if (!storeRef.current) {
    storeRef.current = createTodoStore(initTodoStore())
  }

  return (
    <TodoStoreContext.Provider value={storeRef.current}>
      {children}
    </TodoStoreContext.Provider>
  );
}

export const useTodoStore = <T, >(
  selector: (store: TodoStore) => T,
): T => {
  const todoStoreContext = useContext(TodoStoreContext);

  if (!todoStoreContext) {
    throw new Error(`useTodoStore must be use within TodoStoreProvider`);
  }

  return useStore(todoStoreContext, selector);
}
