import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import { useAuth } from '../../Context/AuthContext';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Please enter a valid email address or phone number.');
      return;
    }

    if (!password) {
      setPasswordError('Password is required.');
      return;
    }

    try {
      await logIn(email, password);
      navigate('/');
    } catch (error) {
      console.log(error);
       setEmailError(error.message);

    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            
          />
          <br />
          {emailError && <p className="error">{emailError}</p>} {}
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <br />
          {passwordError && <p className="error">{passwordError}</p>} {}
          <br />
          <button type="submit">Login</button>
         
        </form>
        <a href="/signup">Signup</a>
        <p >All your personal details are safe with us.</p>
      </div>
    </div>
  );
}

export default Login;
