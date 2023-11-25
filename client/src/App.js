import {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Login"
import UserDetails from "./UserDetails";
import UserList from "./UserList";
import Home from "./Home";
import TaskDetails from "./TaskDetails";
import TaskList from "./TaskList";

const API_URL = "http://127.0.0.1:8080/api";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:username" element={<UserDetails />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/:task_id" element={<TaskDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

/*
function App() {
  const [data, setData] = useState("No data :(");
  
  useEffect(() => {
    async function getData() {
        const url = `${API_URL}/hello`;
        const response = await fetch(url);

        //const data = await response.json();
        setData(await response.text());

    }
    getData();
  }, []); 

  return (
    <main>
      <h1>MERN App!</h1>
      <p>Data from server: {data}</p>
    </main>
  );
}
*/

export default App;
