import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setFilter } from '../store/todoSlice'
import styles from '../styles/TodoFilter.module.scss'
import clsx from 'clsx'

const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((state) => state.todos.filter)

  return (
    <div className={styles['filter-buttons']}>
      <button
        onClick={() => dispatch(setFilter('all'))}
        className={clsx({ [styles.active]: filter === 'all' })}
      >
        Все
      </button>
      <button
        onClick={() => dispatch(setFilter('active'))}
        className={clsx({ [styles.active]: filter === 'active' })}
      >
        Активные
      </button>
      <button
        onClick={() => dispatch(setFilter('completed'))}
        className={clsx({ [styles.active]: filter === 'completed' })}
      >
        Завершённые
      </button>
    </div>
  )
}

export default TodoFilter
