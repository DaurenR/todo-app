import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setFilter } from '../store/todoSlice'
import '../styles/TodoFilter.module.scss'

const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((state) => state.todos.filter)

  return (
    <div>
      <button
        onClick={() => dispatch(setFilter('all'))}
        className={filter === 'all' ? 'active' : ''}
      >
        Все
      </button>
      <button
        onClick={() => dispatch(setFilter('active'))}
        className={filter === 'active' ? 'active' : ''}
      >
        Активные
      </button>
      <button
        onClick={() => dispatch(setFilter('completed'))}
        className={filter === 'completed' ? 'active' : ''}
      >
        Завершённые
      </button>
    </div>
  )
}

export default TodoFilter
