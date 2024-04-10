import { FC, KeyboardEvent, useState, ChangeEventHandler } from 'react';
import cn from 'classnames';
import { useClickOutside } from '@mantine/hooks';
import { TextInput } from "@mantine/core";
import styles from './list-title.module.scss';

interface EditableTitleProps {
  title: string;
  isCompleted: boolean;
  onEdit: (value: string | null) => void;
}

export const EditableTitle: FC<EditableTitleProps> = ({
  title,
  isCompleted,
  onEdit,
}) => {
  const [focused, setFocused] = useState(false);
  const ref = useClickOutside(() => setFocused(false));

  const handleClick = () => {
    setFocused(true);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.currentTarget.blur();
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onEdit(event.currentTarget.value);
  };

  return (
    <div ref={ref} className={cn(styles.root, {
      [styles.completed]: isCompleted,
      [styles.focused]: focused,
    })}>
      {focused ? (
        <TextInput
          placeholder="Введите название"
          value={title}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
      ) : (
        <h2
          onClick={handleClick}
        >
          {title}
        </h2>
      )}
    </div>
  );
};
