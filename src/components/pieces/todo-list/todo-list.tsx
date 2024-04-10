import { FC, useMemo } from 'react';
import Draggable from 'react-draggable';
import { Button, Card } from '@mantine/core';
import { ToDo as ToDoType } from '@/stores/store.types';
import { ToDo as ToDoComponent } from '@/components/pieces/todo/todo';
import { useTodoStore } from "@/providers/todo-store-provider";
import { hasEmpty, isCompleted } from '@/lib/helpers';
import { EditableTitle } from '@/components/pieces/list-title/list-title';
import styles from './todo-list.module.scss';

interface ToDoProps {
  id: number;
  name: string;
  todos: ToDoType[];
}

export const ToDoList: FC<ToDoProps> = ({ id: listId, name, todos }) => {
  const { list, updateList, isDraggable } = useTodoStore((state) => state);

  const content = useMemo(() => {
    const handleEditTitle = (value: string | null) => {
      const newList = {
        ...list[listId],
        name: value || '',
      };
      updateList(listId, newList);
    };

    const handleAddNew = () => {
      if (!hasEmpty(list[listId].todos)) {
        const newList = {
          ...list[listId],
          todos: [
            ...list[listId].todos,
            { content: '', completed: false }
          ],
        };
        updateList(listId, newList);
      }
    }

    const handleChangeContent = (todoId: number, content: string) => {
      const newList = {
        ...list[listId],
        todos: [...list[listId].todos],
      };

      if (newList.todos[todoId]) {
        newList.todos[todoId].content = content;
      }
      updateList(listId, newList);
    }

    const handleChangeStatus = (todoId: number, status: boolean) => {
      const newList = {
        ...list[listId],
        todos: [...list[listId].todos],
      };
      if (newList.todos[todoId]) {
        newList.todos[todoId].completed = status;
      }
      updateList(listId, newList);
    }

    const handleDelete = (todoId: number) => {
      if (todos.length > 1) {
        const newList = {
          ...list[listId],
          todos: [...list[listId].todos],
        };
        newList.todos.splice(todoId, 1);
        updateList(listId, newList);
      }
    }
    
    return (
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className={styles.root}
      >
        <EditableTitle
          title={name}
          isCompleted={isCompleted(todos)}
          onEdit={handleEditTitle}
        />
        {
          todos && todos.map((item, index) => (
            <ToDoComponent
              key={index}
              id={index}
              completed={item.completed}
              isLast={todos.length <= 1}
              content={item.content}
              onAddNew={handleAddNew}
              onChangeContent={handleChangeContent}
              onChangeStatus={handleChangeStatus}
              onDelete={handleDelete}
            ></ToDoComponent>
          ))
        }
        <div className={styles.footer}>
          <Button onClick={handleAddNew} variant="default" size="compact-sm">+</Button>
        </div>
      </Card>
    );
  }, [list, listId, name, todos, updateList]);

  return isDraggable ? (
    <Draggable>
      {content}
    </Draggable>
  ) :
    content;
};
