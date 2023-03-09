import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { v4 as uuidv4 } from 'uuid'

import styles from './App.module.css'
import plusSign from './assets/plusSign.svg'
import emptyListIcon from './assets/emptyList.svg'
import { Task } from './components/Task'

interface Tasks {
  id: string
  content: string
  completed: boolean
}

function App() {
  const [tasks, setTasks] = useState<Array<Tasks>>([])
  const [newTask, setNewTask] = useState('')

  function handleAddTasks(value: string) {
    if (!value || value === '') return
    setTasks([{
      id: uuidv4(),
      completed: false,
      content: value
    }, ...tasks])
  }

  function handleCompleteTask(id: string) {
    const newTasksArray = tasks.map((task,index) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed
        }
      } else {
        return task
      }
    })

    setTasks(newTasksArray)
  }

  function handleDeleteTask(id: string) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const tasksCount = tasks.length
  const completedTasksCount = tasks.filter(item => item.completed).length

  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <form 
          onSubmit={e => {
            e.preventDefault()
            handleAddTasks(newTask)
            setNewTask('')
          }} 
          className={styles.formContainer}
        >
          <input
            type="text" 
            name="task" 
            value={newTask} 
            onChange={e => setNewTask(e.target.value)} 
            placeholder='Adicione uma nova tarefa' 
          />
          <button type='submit'>
            Criar
            <img src={plusSign} alt=""/>
          </button>
        </form>
       
        <div className={styles.listBox}>
          <header className={styles.listHeader}>
            <div className={styles.createdTasks}>
              <p>Tarefas criadas</p>
              <div className={styles.tasksCount}>{tasksCount}</div>
            </div>
            <div className={styles.completedTasks}>
              <p>Concluídas</p>
              <div className={styles.tasksCount}>
                {`${completedTasksCount} de ${tasksCount}`}
              </div>
            </div>
          </header>
          {tasks.length > 0 ?
            <div className={styles.list}>
              {tasks.map(task => 
                <Task
                  id={task.id}
                  content={task.content}
                  checked={tasks.find(item => item.id === task.id)?.completed}
                  handleDeleteTask={handleDeleteTask}
                  handleCompleteTask={handleCompleteTask} 
                />
              )}
            </div>
          : 
            <div className={styles.emptyList}>
              <img src={emptyListIcon} alt=""/>
              <div>
                <strong>Você ainda não tem tarefas cadastradas</strong>  
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </div> 
          }
        </div>
      </div>
    </div>
  )
}

export default App
