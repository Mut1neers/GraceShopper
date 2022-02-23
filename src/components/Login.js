import { SettingsBackupRestoreRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { callApi } from '../api';
import '../style/auth.css';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await callApi({
      url: '/users/login',
      method: 'POST',
      body: { username, password },
    });
    const token = data?.token;
    if (token) {
      localStorage.setItem('token', token);
      setUsername('');
      setPassword('');
      setToken(token);
      history.push('/');
    }
  };
  return (
    <div id='login'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={username}
          placeholder='Enter Username'
          onChange={(event) => setUsername(event.target.value)}
        ></input>

        <input
          type='password'
          value={password}
          placeholder='Enter Password'
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
