import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { callApi } from '../api';
import { Container, Button } from 'react-bootstrap';

// const API_REGISTER = `https://localhost:4000/register`;
// const API_ROOT = `https://mutineers1.herokuapp.com/api`;
// const API_LOGIN = `${API_ROOT}login`;

const AccountForm = ({ action, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [imageurl, setImageUrl] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const isLogin = action === 'login';
  const title = isLogin ? 'Login' : 'Register';
  const oppositeTitle = isLogin ? 'New User?' : 'Already have an account?';
  const oppositeAction = isLogin ? 'register' : 'login';
  const history = useHistory();
  // const actionURL = isLogin ? API_LOGIN : API_REGISTER;

  // const Register = () => {
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [firstName, setFirstName] = useState("");
  //   const [lastName, setLastName] = useState("");
  //   const [email, setEmail] = useState("");
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await callApi({
        url: "/users/register",
        method: "POST",
        body: { username, password, firstName, lastName, email },
      });
      console.log('Username: ', username);
      console.log('Password: ', password);
      console.log('FirstName', firstName)
      console.log('DATA: ', data);
      const token = data?.token;
      // const token = token;
      console.log('TOKEN: ', token);
      if (token) {
        localStorage.setItem('token', token);
        setUsername('');
        setPassword('');
        setToken(token);
        history.push('/users/me');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container style={{ padding: '120px' }}>
        <h2>{title}</h2>
        {action === 'login' ? (
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
            <Button variant='secondary' type='submit'>
              {title}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></input>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              required
              onChange={(event) => setFirstName(event.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              required
              onChange={(event) => setLastName(event.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            ></input>
            <br />
            <Button variant='secondary' type='submit'>
              {title}
            </Button>
          </form>
        )}

        <Link to={`/${oppositeAction}`}>{oppositeTitle}</Link>
      </Container>
    </>
  );
};

export default AccountForm;
