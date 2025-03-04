interface TodoItemProps {
  id: number
  text: string
  completed: boolean
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle, onDelete }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {text}
      </span>
      <button onClick={() => onDelete(id)}>Удалить</button>
    </div>
  )
}

export default TodoItem
