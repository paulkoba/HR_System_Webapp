// TaskList.js
import React, { useState, useEffect } from 'react';
import './TaskList.css'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


const TaskList = () => {
  const [taskList, setTaskList] = useState(null);

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/api/tasks/');
        const taskListData = await response.json();
        setTaskList(taskListData);
      } catch (error) {
        console.error('Error fetching task list:', error);
      }
    };

    fetchTaskList();
  }, []);

  return (
    <div>
        <Navbar/>
        <div className="task-list-container">
            <h1>Task List</h1>
            {taskList ? (
                <table className="task-table">
                <thead>
                <tr>
                    <th>Task Name</th>
                    <th>Creation Date</th>
                    <th>Due Date</th>
                    <th>Estimate</th>
                    {/* Add more table headers as needed */}
                </tr>
                </thead>
                <tbody>
                {taskList.map((task) => (
                    <tr key={task.TaskID}>
                    <td>
                        <Link to={`/tasks/${task.TaskID}`}>{task.TaskName}</Link>
                    </td>
                    <td>{task.CreationDate}</td>
                    <td>{task.DueDate}</td>
                    <td>{task.Estimate}</td>
                    {/* Add more table cells as needed */}
                    </tr>
                ))}
                </tbody>
            </table>
            ) : (
                <p>Loading task list...</p>
            )}
        </div>
    </div>
  );
};

export default TaskList;
