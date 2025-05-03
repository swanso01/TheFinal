// SignupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = existingUsers.some((user) => user.email === email);
    if (userExists) {
      alert('User already exists. Please log in.');
      return;
    }

    const newUser = { email, password, orders: [] };
    existingUsers.push(newUser);

    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Signup successful!');
    navigate('/');
  };

  return (
    <div className="App-login">
      <h2 className="App-login-title">Sign Up</h2>
      <form className="App-login-form" onSubmit={handleSignup}>
        <div className="App-login-inline">
          <input
            className="App-login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="App-login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="App-login-button" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;