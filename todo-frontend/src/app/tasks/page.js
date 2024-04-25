"use client"

import Image from "next/image";
import { useState } from "react";

export default function Tasks() {
  const [newTaskText, setNewTaskText] = useState('')
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Tarea 1'
    },
    {
      id: 2,
      title: 'Tarea 2'
    }])

  const addTask = () => {
    if (newTaskText !== '') {
      setTasks([...tasks, newTaskText])
    }
    setNewTaskText('')
  }

  const deleteTask = (ItemId) => {
    console.log(tasks)
    const updatedList = [...tasks].filter((task) => task.id !== ItemId);
    setTasks(updatedList);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      
    <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">Technology</h3>
    <ul class="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">

      {tasks.map((task) => (
        <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div class="flex items-center ps-3">
            <input id="angular-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label for="angular-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{task.title}</label>
            <button class="mx-3">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
              </svg>
            </button>
          </div>
        </li>
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
