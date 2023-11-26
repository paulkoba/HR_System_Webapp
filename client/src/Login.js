import { useEffect } from "react";

const Login = () => {
  function onTelegramAuth(user) {
    console.log(user);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', 'hr_system_23_authenticator_bot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '100');
    script.setAttribute('onauth', 'onTelegramAuth(user)');
  
    document.body.appendChild(script);
  }, []);
  
  return (
    <div id="login-container">
      <h1>Login with Telegram</h1>
    </div>
  );
};

export default Login;
