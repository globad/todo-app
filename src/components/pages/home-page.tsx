'use client'

import { Chip } from '@mantine/core';
import { useTodoStore } from '@/providers/todo-store-provider';
import styles from './home-page.module.scss';
import { ToDoList } from "@/components/pieces/todo-list/todo-list";

export const HomePage = () => {
  const { addList, list, isDraggable, toggleDraggable } = useTodoStore(
    (state) => state,
  );

  const handleChipClick = () => {
    toggleDraggable();
  };

  return (
    <div className={styles.main}>
      {list && list.map((item, index) => (
        <ToDoList key={index} id={index} name={item.name} todos={item.todos}></ToDoList>
      ))}
      <div className="toolbar">
        <Chip className={styles.chip} defaultChecked={isDraggable} onClick={handleChipClick}>
          Перетаскивание
        </Chip>

        <button className={styles.addNewList} type="button" onClick={() => addList()}>
          Новый список
        </button>
      </div>
    </div>
  );
}
