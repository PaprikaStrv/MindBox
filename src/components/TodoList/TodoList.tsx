import { memo, type FC } from 'react';
import { List } from '@mui/material';
import TodoItem from '@components/TodoItem/TodoItem';
import type { TodoItemType } from '@commonTypes/commonTypes';

interface TodoListProps {
  todos: TodoItemType[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList: FC<TodoListProps> = ({ todos, onToggle, onDelete }) => (
  <List>
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    ))}
  </List>
);

export default memo(TodoList);
