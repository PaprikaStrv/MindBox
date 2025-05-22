import { memo } from 'react';
import { Button, Box, Typography } from '@mui/material';

interface TodoListActionsProps {
  todosLength: number;
  remainingCount: number;
  handleClearCompleted: () => void;
}

const TodoListActions: React.FC<TodoListActionsProps> = ({
  remainingCount,
  handleClearCompleted,
  todosLength,
}) => {

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
      {remainingCount > 0 && (
        <Typography variant="body2">
        {remainingCount} {remainingCount === 1 ? 'задача' : 'задач'} осталось
      </Typography>
    )}

      <Button
        data-testid="todo-list-actions-clear-completed-button"
        variant="outlined"
        color="secondary"
        onClick={handleClearCompleted}
        disabled={remainingCount === todosLength}
    >
      Очистить выполненные
    </Button>
    </Box>
  );
};

export default memo(TodoListActions);
