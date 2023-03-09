import styles from './Task.module.css';

interface TaskProps {
  id: string
  content: string
  checked: boolean | undefined
  handleDeleteTask: (id: string)=> void
  handleCompleteTask: (id: string)=> void
}


export function Task({id, content, checked, handleCompleteTask, handleDeleteTask}: TaskProps) {
  return (
    <div className={styles.listItem}>
      <input 
        className={styles.checkboxInput} 
        id={id} 
        key={id} 
        type="checkbox" 
        onChange={() => handleCompleteTask(id)}
        checked={checked}
      />
      <label className={styles.checkbox} htmlFor={id}>
        <span>
          <img src='' alt="" />
        </span>
        <span>
          {content}
        </span>
      </label>
      <button 
        className={styles.deleteIcon} 
        onClick={() => handleDeleteTask(id)}
      />
    </div>
  );
}