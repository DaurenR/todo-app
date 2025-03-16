import { useSortable } from "@dnd-kit/sortable";
import styles from "../styles/TodoItem.module.scss";
import { CSS } from "@dnd-kit/utilities";

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onToggle,
  onDelete,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={styles.item}
      style={style}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <span className={completed ? styles.completed : styles.text}>{text}</span>
      <button onClick={() => onDelete(id)}>Удалить</button>
    </div>
  );
};

export default TodoItem;
