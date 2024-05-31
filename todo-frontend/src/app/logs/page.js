"use client"

import Task from "@/components/task";
import { db } from "../../lib/db";
import { useEffect, useState } from "react";

export default function TaskList() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    //fetch tasks
    const fetchLogs = async () => {
      try {
        const id = localStorage.getItem('userId')
        const response = await fetch(`/api/logs/?id=${id}`, {
          next: { revalidate: 3600 },
        });

        const data = await response.json();

        setLogs(data);
        console.log(data)
      } catch (error) {
        console.error(`Error fetching items: ${error.message}`);
      }
    };
    // call fetch fetchTasks
    fetchLogs();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 " >

      <h3 className="mb-4 font-semibold text-white">Logs History</h3>
      <table style={{border: "2px solid white"}}>
        <tr>
          <th style={{paddingRight: "5px"}}>Description</th>
          <th>Date</th>
        </tr>

      {logs.map((log) => (
        <tr>
          <td>{log.description}</td>
          <td>{log.date}</td>
        </tr>
      ))}
      
      </table>


    </main>
  );
}
