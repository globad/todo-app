'use client'

import { useTodoStore } from '@/providers/todo-store-provider';
import { ToDoList } from "@/components/pieces/todo-list/todo-list";
import { Toolbar } from "@/components/pieces/toolbar/toolbar";
import styles from './home-page.module.scss';

export const HomePage = () => {
  const { addList, removeList, list, isDraggable, toggleDraggable } = useTodoStore((state) => state);

  return (
    <main className={styles.main}>
      <div className={styles.list}>
        {list && list.map((item, index) => (
          <ToDoList
            key={index}
            id={index}
            name={item.name}
            todos={item.todos}
            onDelete={removeList}
          ></ToDoList>
        ))}
      </div>
      <Toolbar isDraggable={isDraggable} toggleDraggable={toggleDraggable} addList={addList} />
    </main>
  );
}
