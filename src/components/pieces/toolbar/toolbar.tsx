'use client'

import { FC } from 'react';
import { Chip } from '@mantine/core';
import styles from './toolbar.module.scss';


interface ToolbarProps {
  isDraggable: boolean;
  toggleDraggable: VoidFunction;
  addList: VoidFunction;
}

export const Toolbar: FC<ToolbarProps> = ({ isDraggable, toggleDraggable, addList}) => {
  return (
    <div className={styles.toolbar}>
      <Chip className={styles.chip} defaultChecked={isDraggable} onClick={toggleDraggable}>
        Перетаскивание
      </Chip>

      <button className={styles.addNewList} type="button" onClick={addList}>
        +
      </button>
    </div>
  );
}
