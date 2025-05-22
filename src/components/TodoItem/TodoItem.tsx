import { type FC } from 'react';
import { ListItem, Checkbox, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { type TodoItemType } from '@commonTypes/commonTypes';

interface TodoItemProps {
  todo: TodoItemType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          data-testid="todo-item-delete-button-testid"
          edge="end"
          onClick={() => onDelete(todo.id)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox
        data-testid="todo-item-checkbox-testid"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        color="primary"
      />
      <ListItemText
        data-testid="todo-item-text-testid"
        primary={todo.text}
        sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      />
    </ListItem>
  );
};

export default TodoItem;
