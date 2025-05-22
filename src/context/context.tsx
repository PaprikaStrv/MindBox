import {
  createContext,
  useReducer,
  useContext,
  type ReactNode,
  type Dispatch,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FilterEnum, type Filter, type TodoItemType } from '@commonTypes/commonTypes';

type State = {
  todos: TodoItemType[];
  filter: Filter;
};

type Action =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: string }
  | { type: 'DELETE_TODO'; id: string }
  | { type: 'SET_FILTER'; filter: Filter }
  | { type: 'CLEAR_COMPLETED' };

const initialState: State = {
  todos: [],
  filter: FilterEnum.All,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: uuidv4(), text: action.text, completed: false },
        ],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.filter,
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    default:
      return state;
  }
}

const TodoStateContext = createContext<State | undefined>(undefined);
const TodoDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (context === undefined) {
    throw new Error('useTodoState must be used within a TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (context === undefined) {
    throw new Error('useTodoDispatch must be used within a TodoProvider');
  }
  return context;
}
