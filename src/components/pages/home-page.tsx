'use client'

import { useTodoStore } from '@/providers/todo-store-provider';
import styles from './home-page.module.scss';
import {ToDoList} from "@/components/pieces/todo-list/todo-list";

export const HomePage = () => {
  const { count, addList, list } = useTodoStore(
    (state) => state,
  );

  return (
    <div className={styles.main}>
      {list && list.map((item, index) => (
        <ToDoList key={index} id={index} name={item.name} todos={item.todos}></ToDoList>
      ))}
      <div className="toolbar">
        <button className={styles.addNewList} type="button" onClick={() => addList()}>
          Новый список
        </button>
      </div>

    </div>
  );
}
