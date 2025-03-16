import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addTodo, toggleTodo, deleteTodo, reorderTodos } from '../store/todoSlice'
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      }
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = todos.findIndex((todo) => todo.id.toString() === active.id)
    const newIndex = todos.findIndex((todo) => todo.id.toString() === over.id)

    const newTodos = arrayMove(todos, oldIndex, newIndex)
    
    dispatch(reorderTodos(newTodos))
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <TodoInput onAdd={handleAddTodo} />
      <TodoFilter />

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredTodos.map((todo) => todo.id.toString())} strategy={verticalListSortingStrategy}>
          {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onToggle={() => dispatch(toggleTodo(todo.id))}
          onDelete={() => dispatch(deleteTodo(todo.id))}
        />
      ))}
        </SortableContext>
      </DndContext>
      
    </div>
  )
}

export default TodoList
