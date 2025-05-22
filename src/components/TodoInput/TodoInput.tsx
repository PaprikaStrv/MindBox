import { memo, useState, type FC } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput: FC<TodoInputProps> = ({ onAddTodo }) => {
  const [value, setValue] = useState('');

  const handleAddTodo = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onAddTodo(trimmed);
      setValue('');
    }
  };

  return (
    <Box display="flex" gap={1} mb={2}>
      <TextField
        data-testid="todo-input-testid"
        label="Новая задача"
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
      />
      <Button
        data-testid="todo-input-button-testid"
        variant="contained"
        color="primary"
        onClick={handleAddTodo}
      >
        Добавить
      </Button>
    </Box>
  );
};

export default memo(TodoInput);
