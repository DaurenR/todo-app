import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setFilter } from '../store/todoSlice'
import styles from '../styles/TodoFilter.module.scss'

const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((state) => state.todos.filter)

  return (
    <div className={styles['filter-buttons']}>
      <button
        onClick={() => dispatch(setFilter('all'))}
        className={filter === 'all' ? 'styles.active' : ''}
      >
        Все
      </button>
      <button
        onClick={() => dispatch(setFilter('active'))}
        className={filter === 'active' ? 'styles.active' : ''}
      >
        Активные
      </button>
      <button
        onClick={() => dispatch(setFilter('completed'))}
        className={filter === 'completed' ? 'styles.active' : ''}
      >
        Завершённые
      </button>
    </div>
  )
}

export default TodoFilter
