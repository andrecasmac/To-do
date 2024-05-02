"use client"

import Task from "@/components/task";
import { useEffect, useState } from "react";

export default function TaskList() {
  const [newTaskText, setNewTaskText] = useState('')
  const [tasks, setTasks] = useState([])

  const addTask = async (e) => {
    e.preventDefault();
    if (newTaskText === '') {
      alert("Title required");
      return;
    }

    try {
      const apiUrl = "api/tasks";

      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTaskText, user_id: '662f3917f4ff9df9d3424931' }),
      };

      const response = await fetch(apiUrl, requestData);

      if (!response.ok) {
        throw new Error(
          `Failed to post task: ${response.status} - ${response.statusText}`
        );
      }

      setNewTaskText('')
    } catch (error) {
      console.log(error);
    }
  }

  const deleteTask = (id) => {
    const updatedList = tasks.filter((task) => task.id !== id);
    setTasks(updatedList);
  }

  useEffect(() => {
    //fetch tasks
    const fetchTasks = async () => {
      try { 
         const response = await fetch(`/api/tasks`, {
          next: { revalidate: 3600 },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch items: ${response.status}`
          );
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(`Error fetching items: ${error.message}`);
        toast.error("unable to fetch todos at this time");
      }
    };
    // call fetch fetchTasks
    fetchTasks();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 " >
      
    <h3 className="mb-4 font-semibold text-white">Your Tasks</h3>
    <ul className="text-sm font-medium border rounded-lg bg-gray-700 border-gray-600 text-white">

      {tasks.map((task) => (
        <Task taskInfo={task} deleteTask={deleteTask} />
      ))}

      <li key="Add" className="w-full rounded-t-lg">
        <div className="flex items-center ps-3">
          <input value={newTaskText} onChange={(item) => setNewTaskText(item.target.value)} type="text" id="new-task" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="New Task.." required />
          <button onClick={addTask} type="button" className="focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 my-2 bg-green-600 hover:bg-green-700 focus:ring-green-800">+</button>            
        </div>
      </li>        
    </ul>

    </main>
  );
}
