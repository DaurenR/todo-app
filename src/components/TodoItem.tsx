import styles from '../styles/TodoItem.module.scss'

interface TodoItemProps {
  id: number
  text: string
  completed: boolean
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle, onDelete }) => {
  return (
    <div className={styles.item}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <span className={completed ? styles.completed : styles.text}>{text}</span>
      <button onClick={() => onDelete(id)}>Удалить</button>
    </div>
  )
}

export default TodoItem
