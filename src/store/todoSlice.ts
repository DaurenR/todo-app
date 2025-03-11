import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loadState, saveState } from '../utils/localStorage'

interface Todo {
  id: number
  text: string
  completed: boolean
}

type Filter = 'all' | 'active' | 'completed'

interface TodoState {
  todos: Todo[]
  filter: Filter
}

const initialState: TodoState = {
  todos: loadState<Todo[]>('todos', []),
  filter: 'all', // Фильтр по умолчанию
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({ id: Date.now(), text: action.payload, completed: false })
      saveState('todos', state.todos)
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload)
      if (todo) todo.completed = !todo.completed
      saveState('todos', state.todos)
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload)
      saveState('todos', state.todos)
    },
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload
    },
  },
})

export const { addTodo, toggleTodo, deleteTodo, setFilter } = todoSlice.actions
export default todoSlice.reducer
