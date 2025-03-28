import { useState } from 'react'
import styles from '../styles/TodoInput.module.scss'

interface TodoInputProps {
  onAdd: (text: string) => void
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('')

  const handleAdd = () => {
    if (text.trim() === '') return
    onAdd(text)
    setText('')
  }

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()} 
        placeholder="Добавить задачу..."
        className={styles.input}
      />
      <button onClick={handleAdd} className={styles.addButton}>+</button>
    </div>
  )
}

export default TodoInput
