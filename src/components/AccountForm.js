import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { callApi } from '../api';
import { Container, Button } from 'react-bootstrap';

const AccountForm = ({ action, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isLogin = action === 'login';
  const title = isLogin ? 'Login' : 'Register';
  const oppositeTitle = isLogin ? 'New User?' : 'Already have an account?';
  const oppositeAction = isLogin ? 'register' : 'login';
  const history = useHistory();

  const handleSubmit = async (event) => {
    const action = 'login'
    event.preventDefault();
    const data = await callApi({
      url: `/users/${action}`,
      body: { username, password },
      method: 'POST',
    });
    const token = data?.token;
    console.log('TOKEN: ', token);
    if (token) {
      localStorage.setItem('token', token);
      setUsername('');
      setPassword('');
      setToken(token);
      history.push('/');
    }
  };

  return (
    <>
      <Container style={{ padding: '120px' }}>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='username'
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          ></input>
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <br />
          <Button variant='secondary' type='submit'>
            {title}
          </Button>
        </form>
        <Link to={`/${oppositeAction}`}>{oppositeTitle}</Link>
      </Container>
    </>
  );
};

export default AccountForm;
