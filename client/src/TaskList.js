// TaskList.js
import React, { useState, useEffect } from 'react';
import './TaskList.css'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


const TaskList = () => {
  const [taskList, setTaskList] = useState(null);
  const [assigneeList, setAssigneeList] = useState(null);
  const [assignee, setAssignee] = useState(null);

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const tasksResponse = await fetch('http://127.0.0.1:8080/api/tasks/');
        const taskListData = await tasksResponse.json();
        setTaskList(taskListData);

        const assigneesResponse = await fetch('http://127.0.0.1:8080/api/assignees/');
        const assigneesData = await assigneesResponse.json();
        setAssigneeList(assigneesData);

        console.log(assigneeList)
      } catch (error) {
        console.error('Error fetching task list:', error);
      }
    };

    fetchTaskList();
  }, []);

  useEffect(() => {
    const fetchTasksAssignedToUser = async () => {
      if (assignee) {
        try {
          if(assignee == "any") {            
            const tasksResponse = await fetch('http://127.0.0.1:8080/api/tasks/');
            const taskListData = await tasksResponse.json();
            setTaskList(taskListData);
            return;
          }

          const response = await fetch(`http://127.0.0.1:8080/api/tasks_assigned_to/${assignee}`);
          
          const assignedTasksData = await response.json();
          setTaskList(assignedTasksData);
        } catch (error) {
          console.error('Error fetching tasks assigned to user:', error);
        }
      }
    };

    fetchTasksAssignedToUser();
  }, [assignee]);

  return (
    <div>
        <Navbar/>
        <div className="task-list-container">
            <h1>Task List</h1>
            <div>
              <label htmlFor="assigneeDropdown">Assignee:</label>
              <select
                id="assigneeDropdown"
                onChange={(e) => setAssignee(e.target.value)}
                value={assignee || ''}
              >
                <option selected="selected" key="any" value="any">Any</option>
                {assigneeList ? assigneeList.map((assignee) => (
                  <option key={assignee.UserID} value={assignee.UserID}>
                    {assignee.Username}
                  </option>
                )) : "Loading"}
              </select>
            </div>
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
