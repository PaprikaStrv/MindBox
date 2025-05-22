import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoListActions from './TodoListActions';

describe('TodoListActions component', () => {
  let handleClearCompleted: jest.Mock;

  beforeEach(() => {
    handleClearCompleted = jest.fn();
  });

  test('shows remaining count text and enables button when some tasks remain', async () => {
    render(
      <TodoListActions
        remainingCount={2}
        todosLength={5}
        handleClearCompleted={handleClearCompleted}
      />
    );

    expect(screen.getByText('2 задач осталось')).toBeInTheDocument();

    const button = screen.getByTestId(
      'todo-list-actions-clear-completed-button'
    );
    expect(button).toBeEnabled();

    await userEvent.click(button);
    expect(handleClearCompleted).toHaveBeenCalledTimes(1);
  });

  test('correctly singularizes "задача" when remainingCount is 1', () => {
    render(
      <TodoListActions
        remainingCount={1}
        todosLength={3}
        handleClearCompleted={handleClearCompleted}
      />
    );
    expect(screen.getByText('1 задача осталось')).toBeInTheDocument();
  });

  test('hides remaining text when no tasks remain', () => {
    render(
      <TodoListActions
        remainingCount={0}
        todosLength={5}
        handleClearCompleted={handleClearCompleted}
      />
    );
    expect(screen.queryByText(/\d+ задач? осталось/)).toBeNull();

    const button = screen.getByTestId(
      'todo-list-actions-clear-completed-button'
    );
    expect(button).toBeEnabled();
  });

  test('disables button when no completed tasks (remainingCount equals todosLength)', () => {
    render(
      <TodoListActions
        remainingCount={4}
        todosLength={4}
        handleClearCompleted={handleClearCompleted}
      />
    );
    const button = screen.getByTestId(
      'todo-list-actions-clear-completed-button'
    );
    expect(button).toBeDisabled();
  });
});
