import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  reducer,
  initialState,
  TodoProvider,
  useTodoState,
  useTodoDispatch,
  ActionType,
} from './context';
import { FilterEnum } from '@commonTypes/commonTypes';

describe('reducer function', () => {
  test('ADD_TODO adds new todo', () => {
    const state = { ...initialState, todos: [] };
    const newState = reducer(state, { type: ActionType.ADD_TODO, text: 'Test' });
    expect(newState.todos).toHaveLength(1);
    expect(newState.todos[0].text).toBe('Test');
    expect(newState.todos[0].completed).toBe(false);
  });

  test('TOGGLE_TODO toggles completed', () => {
    const state = {
      ...initialState,
      todos: [{ id: '1', text: 'A', completed: false }],
    };
    const toggled = reducer(state, { type: ActionType.TOGGLE_TODO, id: '1' });
    expect(toggled.todos[0].completed).toBe(true);
  });

  test('DELETE_TODO removes by id', () => {
    const state = {
      ...initialState,
      todos: [
        { id: '1', text: 'A', completed: false },
        { id: '2', text: 'B', completed: true },
      ],
    };
    const res = reducer(state, { type: ActionType.DELETE_TODO, id: '1' });
    expect(res.todos).toHaveLength(1);
    expect(res.todos[0].id).toBe('2');
  });

  test('SET_FILTER updates filter', () => {
    const state = { ...initialState, filter: FilterEnum.All };
    const res = reducer(state, { type: ActionType.SET_FILTER, filter: FilterEnum.Active });
    expect(res.filter).toBe(FilterEnum.Active);
  });

  test('CLEAR_COMPLETED removes all completed todos', () => {
    const state = {
      ...initialState,
      todos: [
        { id: '1', text: 'A', completed: true },
        { id: '2', text: 'B', completed: false },
      ],
    };
    const res = reducer(state, { type: ActionType.CLEAR_COMPLETED });
    expect(res.todos).toHaveLength(1);
    expect(res.todos[0].completed).toBe(false);
  });
});

describe('TodoContext hooks and provider', () => {
  test('useTodoState/useTodoDispatch throw when outside provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    const TestState = () => { useTodoState(); return null; };
    const TestDispatch = () => { useTodoDispatch(); return null; };

    expect(() => render(<TestState />)).toThrow(/must be used within a TodoProvider/);
    expect(() => render(<TestDispatch />)).toThrow(/must be used within a TodoProvider/);
    consoleError.mockRestore();
  });

  test('TodoProvider provides state and dispatch', async () => {
    const TestComponent = () => {
      const state = useTodoState();
      const dispatch = useTodoDispatch();
      return (
        <>
          <span data-testid="count">{state.todos.length}</span>
          <button
            data-testid="add"
            onClick={() => dispatch({ type: ActionType.ADD_TODO, text: 'X' })}
          >
            Add
          </button>
        </>
      );
    };

    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    const count = screen.getByTestId('count');
    const addBtn = screen.getByTestId('add');

    expect(count).toHaveTextContent('0');
    await userEvent.click(addBtn);
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });
});
