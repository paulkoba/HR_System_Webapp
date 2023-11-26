// TaskDetails.js
import React, { useState, useEffect } from 'react';
import './TaskDetails.css';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
const TaskDetails = ({ }) => {
  const [task, setTask] = useState(null);
  const [author, setAuthor] = useState(null);
  const [assignees, setAssignees] = useState(null);
  const { task_id } = useParams();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const taskResponse = await fetch(`http://127.0.0.1:8080/api/tasks/${task_id}`);
        const taskData = await taskResponse.json();

        setTask(taskData);

        const authorResponse = await fetch(`http://127.0.0.1:8080/api/username_from_id/${taskData.AuthorID}`);
        const authorData = await authorResponse.json();

        setAuthor(authorData);

        const assigneesResponse = await fetch(`http://127.0.0.1:8080/api/assignees/${taskData.TaskID}`);
        const assigneesData = await assigneesResponse.json();
        for (let i = 0; i < assigneesData.length; i++) {
          // Fetch username for each assignee
          const usernameResponse = await fetch(`http://127.0.0.1:8080/api/username_from_id/${assigneesData[i].ID}`);
          const usernameData = await usernameResponse.json();
          assigneesData[i]['Username'] = usernameData.Username;
        }
        
        console.log(assigneesData)
        setAssignees(assigneesData)
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
            <p>Task Description:</p>
            <p>{task.TaskDescription}</p>
            <p>Creation Date: {task.CreationDate}</p>
            <p>Due Date: {task.DueDate}</p>
            <p>Estimate: {task.Estimate}</p>
            <p>Attachments: {task.Attachment}</p>
            <p>Task ID: {task.TaskID}</p>
            <p>Author: {author ? author.Username : task.AuthorID}</p>
            <p>
              Assignees:&nbsp;
              {
                assignees && assignees.length > 0 ? <span>
                  {
                    assignees.map((assignee) => (
                      assignee.Username
                    ))
                  }
                </span>  : "None"
              }
            </p>
            </div>
        ) : (
            <p>Loading task details...</p>
        )}
        </div>
    </div>
  );
};

export default TaskDetails;
