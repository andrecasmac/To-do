import { useState } from "react"

export default function Task({taskInfo, deleteTask}) {

    const [isDone, setIsDone] = useState(taskInfo.isDone);

    const handleDelete = () => deleteTask(taskInfo.id);
    const handleCheckbox = () => setIsDone(!isDone);

    return (
        <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div class="flex items-center ps-3">
            <input 
              checked={isDone}
              onChange={handleCheckbox}
              id="angular-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label 
              style={{ textDecoration: isDone ? "line-through" : "none" }}
              for="angular-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{taskInfo.title}
            </label>
            <button onClick={handleDelete} class="mx-3">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
              </svg>
            </button>
          </div>
        </li>
    )
}