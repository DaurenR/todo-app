import { useState, useRef } from 'react'
import { useAppDispatch } from '../store/hooks'
import { editTodo } from '../store/todoSlice'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from '../styles/TodoItem.module.scss'

interface TodoItemProps {
  id: number
  text: string
  completed: boolean
  onToggle: () => void
  onDelete: () => void
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle, onDelete }) => {
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [newText, setNewText] = useState(text)
  const inputRef = useRef<HTMLInputElement>(null)

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id.toString(), disabled: isEditing })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleSave = () => {
    if (newText.trim() === '') return
    dispatch(editTodo({ id, newText }))
    setIsEditing(false)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isEditing ? {} : { ...attributes, ...listeners })}
      className={styles.todoItem}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className={styles.checkbox}
      />

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className={styles.todoInput}
        />
      ) : (
        <span
          className={`${styles.text} ${completed ? styles.completed : ''}`}
          onDoubleClick={() => {
            setIsEditing(true)
            setTimeout(() => inputRef.current?.focus(), 0)
          }}
        >
          {text}
        </span>
      )}

      <button onClick={onDelete} className={styles.deleteBtn}>✕</button>
    </div>
  )
}

export default TodoItem
