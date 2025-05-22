import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

describe('App full integration scenario', () => {
  test('full scenario: add, toggle, clear completed', async () => {
    render(<App />);

    // 1. Добавляем задачу
    const input = screen.getByRole('textbox', { name: /Новая задача/i }) as HTMLInputElement;
    await userEvent.type(input, 'Test task');
    expect(input.value).toBe('Test task');

    await userEvent.click(
      screen.getByRole('button', { name: /Добавить/i })
    );
    // После добавления поле должно очиститься
    expect(input.value).toBe('');

    // Задача появилась в списке
    const taskText = screen.getByText('Test task');
    expect(taskText).toBeInTheDocument();

    // 2. Переключаем статус задачи (чекбокс)
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    // Текст задачи перечёркивается
    const textItem = screen.getByTestId('todo-item-text-testid');
    expect(textItem).toHaveStyle('text-decoration: line-through');

    // 3. Очищаем выполненные задачи
    const clearBtn = screen.getByRole('button', { name: /Очистить выполненные/i });
    // Кнопка должна быть активна, т.к. остались выполненные
    expect(clearBtn).toBeEnabled();

    await userEvent.click(clearBtn);
    // Задача должна исчезнуть
    expect(screen.queryByText('Test task')).toBeNull();
  });
});
