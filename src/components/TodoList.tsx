import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { addTodo, toggleTodo, deleteTodo } from '../store/todoSlice'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos)
  const dispatch = useDispatch()

  const handleAddTodo = (text: string) => {
    dispatch(addTodo(text))
  }

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id))
  }

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id))
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <TodoInput onAdd={handleAddTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      ))}
    </div>
  )
}

export default TodoList
