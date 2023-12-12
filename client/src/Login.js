import { useEffect } from "react";
import Navbar from "./Navbar";
import './Login.css'

const Login = () => {
  return (
    <div>
      <Navbar/>
      <div className="login-container">
        <h2>You can  authorization via our telegram bot: &nbsp;
          <a href="https://t.me/hr_system_23_bot" target="_blank" rel="noopener noreferrer">
              @hr_system_23_bot
          </a>
        </h2>
      </div>
    </div>
  )
};

export default Login;
