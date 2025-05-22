import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import { FilterEnum, type Filter } from '@commonTypes/commonTypes';
import TodoList from '@components/TodoList/TodoList';
import TodoInput from '@components/TodoInput/TodoInput';
import TodoListActions from '@components/TodoListActions/TodoListActions';
import { TodoProvider, useTodoDispatch, useTodoState } from '@context/context';
import { useCallback, useMemo } from 'react';

function AppContent() {
  const { todos, filter } = useTodoState();
  const dispatch = useTodoDispatch();

  const handleAddTodo = useCallback((text: string) => {
    dispatch({ type: 'ADD_TODO', text });
  }, [dispatch]);

  const handleToggle = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', id });
  }, [dispatch]);

  const handleDelete = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TODO', id });
  }, [dispatch]);

  const handleClearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, [dispatch]);

  const handleFilterChange = (filter: Filter) => {
    dispatch({ type: 'SET_FILTER', filter });
  };

  const filteredTodos = useMemo(() => todos.filter((todo) => {
    if (filter === FilterEnum.Active) return !todo.completed;
    if (filter === FilterEnum.Completed) return todo.completed;
    return true;
  }), [todos, filter]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Список задач
      </Typography>

      <TodoInput onAddTodo={handleAddTodo} />

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={filter}
          onChange={(_, newValue) => handleFilterChange(newValue as Filter)}
          centered
        >
          <Tab label="Все" value={FilterEnum.All} />
          <Tab label="Активные" value={FilterEnum.Active} />
          <Tab label="Выполненные" value={FilterEnum.Completed} />
        </Tabs>
      </Box>

      <TodoListActions
        todosLength={todos.length}
        remainingCount={todos.filter((todo) => !todo.completed).length}
        handleClearCompleted={handleClearCompleted}
      />

      <TodoList
        todos={filteredTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </Container>
  );
}

function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}

export default App;
