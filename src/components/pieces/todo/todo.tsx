import { FC, ChangeEventHandler, KeyboardEventHandler } from 'react';
import { Checkbox, TextInput, CloseButton  } from '@mantine/core';
import styles from './todo.module.scss';

interface ToDoProps {
  id: number;
  content: string;
  completed: boolean;
  isLast: boolean;
  onAddNew: () => void;
  onChangeContent: (id: number, value: string) => void;
  onChangeStatus: (id: number, value: boolean) => void;
  onDelete: (id: number) => void;
}

export const ToDo: FC<ToDoProps> = ({
  id,
  content,
  completed,
  isLast,
  onAddNew,
  onChangeContent,
  onChangeStatus,
  onDelete,
}) => {
  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      onAddNew();
    }
  };

  const handleChangeContent: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChangeContent(id, event.currentTarget.value);
  }

  const handleChangeStatus: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChangeStatus(id, event.currentTarget.checked);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className={styles.root}>
      <Checkbox
        variant="default"
        checked={completed}
        onChange={handleChangeStatus}
      ></Checkbox>

      <TextInput
        className={styles.textInput}
        placeholder="Введите текст"
        value={content}
        onChange={handleChangeContent}
        onKeyUp={handleKeyUp}
      ></TextInput>

      <CloseButton
        onClick={handleDelete}
        disabled={isLast}
      ></CloseButton>
    </div>
  );
}
