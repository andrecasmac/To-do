import { useState } from "react"

export default function Task({taskInfo, deleteTask}) {

    const [isDone, setIsDone] = useState(taskInfo.status === "Complete");

    const handleDelete = () => deleteTask(taskInfo.id);
    const handleCheckbox = () => setIsDone(!isDone);

    return (
        <li className="w-full border-b border-gray-200 rounded-t-lg border-gray-600">
          <div className="flex items-center ps-3">
            <input 
              checked={isDone}
              onChange={handleCheckbox}
              id="angular-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600rounded focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
            />
            <label 
              style={{ textDecoration: isDone ? "line-through" : "none" }}
              htmlFor="angular-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-300">{taskInfo.title}
            </label>
            <button onClick={handleDelete} className="mx-3">
              <svg className="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
              </svg>
            </button>
          </div>
        </li>
    )
}