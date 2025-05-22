import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';
import type { TodoItemType } from '@commonTypes/commonTypes';

describe('TodoList component', () => {
  const todos: TodoItemType[] = [
    { id: '1', text: 'Task One', completed: false },
    { id: '2', text: 'Task Two', completed: true },
  ];
  let onToggle: jest.Mock;
  let onDelete: jest.Mock;

  beforeEach(() => {
    onToggle = jest.fn();
    onDelete = jest.fn();
    render(<TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />);
  });

  test('renders all todo items', () => {
    expect(screen.getByText('Task One')).toBeInTheDocument();
    expect(screen.getByText('Task Two')).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  test('toggle handler is called when checkbox clicked', async () => {
    const checkboxes = screen.getAllByRole('checkbox');

    await userEvent.click(checkboxes[0]);
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith('1');
  });

  test('delete handler is called when delete button clicked', async () => {
    const deleteButtons = screen.getAllByTestId(
      'todo-item-delete-button-testid'
    );

    await userEvent.click(deleteButtons[1]);
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith('2');
  });
});
