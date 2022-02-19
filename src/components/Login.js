import { SettingsBackupRestoreRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { callApi } from '../api';

// const BASE_URL = 'https://https://mutineers1.herokuapp.com/api/2108-LSU-RM-WEB-PT';

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
    console.log('TOKEN: ', token);
    if (token) {
      // const data = await response.json();
      // const token = data.data.token;
      // setTok;
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
        <label>Username</label>
        <input
          type='text'
          value={username}
          placeholder='Enter Username'
          onChange={(event) => setUsername(event.target.value)}
        ></input>

        <label>Password</label>
        <input
          type='text'
          value={password}
          placeholder='Enter Password'
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type='submit'>Where is this?</button>
      </form>
    </div>
  );
};

export default Login;
