import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const maxTasks = 999;

  console.log(tasks)

  function generateRandomId(){
    // Retorna random id 'único' entre 1 e o máximo de tasks, re-executa ate ser único.
    let randomId = Math.floor(Math.random() * maxTasks + 1)
    tasks.map((task)=>{
      if(task.id === randomId) randomId = generateRandomId()
    })
    return randomId
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio ou numero mámixo de tasks seja atingido.
    if(!newTaskTitle || maxTasks === tasks.length) return;
    setTasks([...tasks, { id: generateRandomId(), title: newTaskTitle, isComplete: false }]) 
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID.
    const changingTasksCompletion = tasks.map((task)=>{
      if(task.id === id){ task.isComplete = (task.isComplete ? false : true) }
      return task
    })
    setTasks(changingTasksCompletion)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID.
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}