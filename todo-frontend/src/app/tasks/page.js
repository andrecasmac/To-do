"use client"

import Task from "@/components/task";
import { useState } from "react";

export default function TaskList() {
  const [newTaskText, setNewTaskText] = useState('')
  const [lastId, setLastID] = useState(2)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Tarea 1',
      isDone: false
    },
    {
      id: 2,
      title: 'Tarea 2',
      isDone: true
    }])

  const addTask = () => {
    if (newTaskText !== '') {
      setTasks([...tasks, {
        id: lastId + 1,
        title: newTaskText,
        isDone: false
      }])
    }
    setNewTaskText('')
    setLastID(lastId + 1)
  }

  const deleteTask = (id) => {
    const updatedList = tasks.filter((task) => task.id !== id);
    setTasks(updatedList);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 " >
      
    <h3 class="mb-4 font-semibold text-white dark:text-white">Your Tasks</h3>
    <ul class="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">

      {tasks.map((task) => (
        <Task taskInfo={task} deleteTask={deleteTask} />
      ))}

      <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div class="flex items-center ps-3">
          <input value={newTaskText} onChange={(item) => setNewTaskText(item.target.value)} type="text" id="new-task" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New Task.." required />
          <button onClick={addTask} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 my-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+</button>            
        </div>
      </li>        
    </ul>

    </main>
  );
}
