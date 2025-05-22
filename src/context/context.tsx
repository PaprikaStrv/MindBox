import {
  createContext,
  useReducer,
  useContext,
  type ReactNode,
  type Dispatch,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  FilterEnum,
  type Filter,
  type TodoItemType,
} from '@commonTypes/commonTypes';

type State = {
  todos: TodoItemType[];
  filter: Filter;
};

export enum ActionType {
  ADD_TODO = 'ADD_TODO',
  TOGGLE_TODO = 'TOGGLE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  SET_FILTER = 'SET_FILTER',
  CLEAR_COMPLETED = 'CLEAR_COMPLETED',
}

type Action =
  | { type: ActionType.ADD_TODO; text: string }
  | { type: ActionType.TOGGLE_TODO; id: string }
  | { type: ActionType.DELETE_TODO; id: string }
  | { type: ActionType.SET_FILTER; filter: Filter }
  | { type: ActionType.CLEAR_COMPLETED };

export const initialState: State = {
  todos: [],
  filter: FilterEnum.All,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: uuidv4(), text: action.text, completed: false },
        ],
      };
    case ActionType.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case ActionType.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case ActionType.SET_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    case ActionType.CLEAR_COMPLETED:
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
