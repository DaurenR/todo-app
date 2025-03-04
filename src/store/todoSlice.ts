import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loadState, saveState } from '../utils/localStorage'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const initialState: Todo[] = loadState<Todo[]>('todos', [])

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = { id: Date.now(), text: action.payload, completed: false }
      state.push(newTodo)
      saveState('todos', state) // Сохраняем в LocalStorage
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find((t) => t.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
        saveState('todos', state) // Обновляем LocalStorage
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const newState = state.filter((t) => t.id !== action.payload)
      saveState('todos', newState)
      return newState
    },
  },
})

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions
export default todoSlice.reducer
