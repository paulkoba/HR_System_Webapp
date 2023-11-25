// TaskDetails.js
import React, { useState, useEffect } from 'react';
import './TaskDetails.css';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
const TaskDetails = ({ }) => {
  const [task, setTask] = useState(null);
  const { task_id } = useParams();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const taskResponse = await fetch(`http://127.0.0.1:8080/api/tasks/${task_id}`);
        const taskData = await taskResponse.json();
        setTask(taskData);
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };
  
    fetchTaskDetails();
  }, [task_id]);

  return (
    <div>
        <Navbar/>
        <div className="task-details-container">
        <h1>Task Details</h1>
        {task ? (
            <div>
            <p>Task Name: {task.TaskName}</p>
            <p>Task Description: {task.TaskDescription}</p>
            <p>Creation Date: {task.CreationDate}</p>
            <p>Due Date: {task.DueDate}</p>
            <p>Estimate: {task.Estimate}</p>
            <p>Attachments: {task.Attachment}</p>
            <p>Task ID: {task.TaskID}</p>
            <p>Author ID: {task.AuthorID}</p>
            </div>
        ) : (
            <p>Loading task details...</p>
        )}
        </div>
    </div>
  );
};

export default TaskDetails;
