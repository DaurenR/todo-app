import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addTodo, toggleTodo, deleteTodo } from '../store/todoSlice'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import TodoFilter from './TodoFilter'
import '../styles/TodoList.module.scss'

const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.todos)
  const filter = useAppSelector((state) => state.todos.filter)
  const dispatch = useAppDispatch()

  const handleAddTodo = (text: string) => {
    dispatch(addTodo(text))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div>
      <h1>To-Do List</h1>
      <TodoInput onAdd={handleAddTodo} />
      <TodoFilter />
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onToggle={() => dispatch(toggleTodo(todo.id))}
          onDelete={() => dispatch(deleteTodo(todo.id))}
        />
      ))}
    </div>
  )
}

export default TodoList
