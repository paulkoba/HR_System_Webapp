import {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Login"
import UserDetails from "./UserDetails";
import UserList from "./UserList";
import Home from "./Home";
import TaskDetails from "./TaskDetails";
import TaskList from "./TaskList";
import Auth from "./Auth"

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
        <Route path="/auth/:auth_key" element={ <Auth /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
