import { useState } from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), text, completed: false }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <TodoInput onAdd={addTodo} />
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} onToggle={toggleTodo} onDelete={deleteTodo} />
      ))}
    </div>
  )
}

export default TodoList
