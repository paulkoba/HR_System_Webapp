// TaskDetails.js
import React, { useState, useEffect } from 'react';
import './TaskDetails.css';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { endpointsPrefix } from './Keys';
import './style.css'
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const TaskDetails = ({ }) => {
  const [task, setTask] = useState(null);
  const [author, setAuthor] = useState(null);
  const [assignees, setAssignees] = useState(null);

  const { task_id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(['authToken']);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  const [isEditing, setIsEditing] = useState(false)

  const initNavbarBoilerplate = async () => {
    console.log("Auth key:", cookie);


    if (!!cookie.authToken) {
      console.log("Logged in");
      const usernameResponse = await fetch(`${endpointsPrefix}/verify_creds/${cookie.authToken}`);
      const usernameData = await usernameResponse.json();
      setLoggedInUsername(usernameData.Username.substr(1));
      setIsLoggedIn(true);
    } else {
      setLoggedInUsername(null)
      setIsLoggedIn(false);
    }
  }

  const setEditable = async () => {
    console.log("Editing");
    const inputs = document.querySelectorAll('input[readOnly]');
    inputs.forEach(input => {
      if (input.id !== 'creationDate' && input.id !== 'taskID' && input.id !== 'author') {
        input.removeAttribute('readOnly');
      }
    });
    document.getElementById('taskDescription').removeAttribute('readOnly');
    setIsEditing(true);
  }

  const saveEdited = async () => {
    console.log("Saving changes");
    try {
      const data = {
        taskName: document.getElementById('taskName').value,
        taskDescription: document.getElementById('taskDescription').value,
        dueDate: document.getElementById('dueDate').value,
        estimate: document.getElementById('estimate').value
      };

      const response = await fetch(`${endpointsPrefix}/edit_task/${document.getElementById('taskID').value}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: cookie.authToken
        },
        body: JSON.stringify(data),
      })

      window.location.reload()
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const taskResponse = await fetch(`${endpointsPrefix}/tasks/${task_id}`);
        const taskData = await taskResponse.json();

        setTask(taskData);

        const authorResponse = await fetch(`${endpointsPrefix}/username_from_id/${taskData.AuthorID}`);
        const authorData = await authorResponse.json();

        setAuthor(authorData);
        try {
          if (document.getElementById('author').value == taskData.AuthorID) {
            document.getElementById('author').value = authorData.Username;
          }
        }
        catch (error) {

        }

        const assigneesResponse = await fetch(`${endpointsPrefix}/assignees/${taskData.TaskID}`);
        const assigneesData = await assigneesResponse.json();
        for (let i = 0; i < assigneesData.length; i++) {
          // Fetch username for each assignee
          const usernameResponse = await fetch(`${endpointsPrefix}/username_from_id/${assigneesData[i].ID}`);
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
    initNavbarBoilerplate();
  }, [task_id]);

  return (
    <div>
      <Navbar />
      <div className="task-details-container">
        <h1>Task Details</h1>
        {task ? (
          <div>
            <label htmlFor="taskName">Task Name:</label>
            <input type="text" id="taskName" defaultValue={task.TaskName} readOnly />

            <label htmlFor="taskDescription">Task Description:</label>
            <textarea id="taskDescription" rows="5" defaultValue={task.TaskDescription} readOnly />

            <label htmlFor="creationDate">Creation Date:</label>
            <input type="text" id="creationDate" defaultValue={task.CreationDate} readOnly />

            <label htmlFor="dueDate">Due Date:</label>
            <input type="text" id="dueDate" defaultValue={task.DueDate} readOnly />

            <label htmlFor="estimate">Estimate:</label>
            <input type="text" id="estimate" defaultValue={task.Estimate} readOnly />

            <label htmlFor="taskID">Task ID:</label>
            <input type="text" id="taskID" defaultValue={task.TaskID} readOnly />

            <label htmlFor="author">Author:</label>
            <input type="text" id="author" defaultValue={task.AuthorID} readOnly />
            <p>

              Assignees:&nbsp;
              {
                assignees && assignees.length > 0 ? <span>
                  {
                    assignees.map((assignee) => (
                      assignee.Username + " "
                    ))
                  }
                </span> : "None"
              }
            </p>
            {!isEditing ? <div className="button-container">
              <Link to={`/tasks/`} className="view-details-button">
                <button className="back-button">
                  Back
                </button>
              </Link>
              {isLoggedIn ?
                <button className="edit-button" onClick={setEditable}>
                  Edit
                </button> : <></>}
            </div> : <div className="button-container">
              <Link to={`/tasks/`} className="view-details-button"><button className="back-button">
                Back
              </button>
              </Link>
              <button className="edit-button" onClick={saveEdited}>
                Save
              </button>
            </div>}
          </div>
        ) : (
          <p>Loading task details...</p>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
