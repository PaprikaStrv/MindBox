import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoInput from './TodoInput';

describe('TodoInput component', () => {
  test('renders input and button', () => {
    const mockAdd = jest.fn();
    render(<TodoInput onAddTodo={mockAdd} />);

    const input = screen.getByRole('textbox', {
      name: /Новая задача/i,
    }) as HTMLInputElement;
    const button = screen.getByTestId('todo-input-button-testid');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Добавить');
  });

  test('calls onAddTodo with trimmed value and clears input on button click', async () => {
    const mockAdd = jest.fn();
    render(<TodoInput onAddTodo={mockAdd} />);

    const input = screen.getByRole('textbox', {
      name: /Новая задача/i,
    }) as HTMLInputElement;
    const button = screen.getByTestId('todo-input-button-testid');


    await userEvent.type(input, '  Task 1  ');
    expect(input.value).toBe('  Task 1  ');

    await userEvent.click(button);
    expect(mockAdd).toHaveBeenCalledTimes(1);
    expect(mockAdd).toHaveBeenCalledWith('Task 1');

    expect(input.value).toBe('');
  });

  test('does not call onAddTodo when input is empty or only whitespace', async () => {
    const mockAdd = jest.fn();
    render(<TodoInput onAddTodo={mockAdd} />);

    const input = screen.getByRole('textbox', {
      name: /Новая задача/i,
    }) as HTMLInputElement;
    const button = screen.getByTestId('todo-input-button-testid');

    // empty input
    expect(input.value).toBe('');
    await userEvent.click(button);
    expect(mockAdd).not.toHaveBeenCalled();

    // whitespace only
    await userEvent.type(input, '   ');
    expect(input.value).toBe('   ');
    await userEvent.click(button);
    expect(mockAdd).not.toHaveBeenCalled();

    // input remains unchanged when not added
    expect(input.value).toBe('   ');
  });
});
