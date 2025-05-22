import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';
import type { TodoItemType } from '@commonTypes/commonTypes';

describe('TodoItem component', () => {
  const sampleTodo: TodoItemType = {
    id: '1',
    text: 'Sample Task',
    completed: false,
  };
  let mockToggle: jest.Mock;
  let mockDelete: jest.Mock;

  beforeEach(() => {
    mockToggle = jest.fn();
    mockDelete = jest.fn();
  });

  test('renders todo text and unchecked checkbox', () => {
    render(
      <TodoItem
        todo={sampleTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
      />
    );

    const text = screen.getByTestId('todo-item-text-testid');
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    const deleteButton = screen.getByTestId('todo-item-delete-button-testid');

    expect(text).toHaveTextContent('Sample Task');
    expect(checkbox.checked).toBe(false);
    expect(deleteButton).toBeInTheDocument();
  });

  test('checkbox toggles todo status', () => {
    render(
      <TodoItem
        todo={sampleTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith('1');
  });

  test('delete button triggers onDelete', () => {
    render(
      <TodoItem
        todo={sampleTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
      />
    );

    const deleteButton = screen.getByTestId('todo-item-delete-button-testid');
    fireEvent.click(deleteButton);
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith('1');
  });

  test('completed todo has line-through style', () => {
    const completedTodo: TodoItemType = { ...sampleTodo, completed: true };
    render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
      />
    );

    const text = screen.getByTestId('todo-item-text-testid');
    expect(text).toHaveStyle('text-decoration: line-through');
  });
});
