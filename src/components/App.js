import React, { useState, useEffect } from 'react';
import { callApi } from '../api';

import { Site, NavBar } from './';

import { getAPIHealth } from '../axios-services';
import '../style/App.css';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [token, setToken] = useState('');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([])

  const fetchUserData = async (token) => {
    const data = await callApi({
      url: '/users/me',
      token,
    });
    console.log('USERDATA: ', data);
    return data;
  };

  const fetchOrders = async () => {
    const orders = await callApi({ url: '/orders' });
    console.log('orders: ', orders);
    return orders;
  };
  const fetchProducts = async () => {
    const products = await callApi({ url: '/products' });
    console.log('products: ', products);
    return products;
  };
  const fetchUsers = async () => {
    const users = await callApi({ url: '/users' });
    console.log('users: ', users);
    return users;
  };

  useEffect(() => {
    const fetchData = async () => {
      const orders = await fetchOrders();
      setOrders(orders);
      const products = await fetchProducts();
      setProducts(products);
      const users = await fetchUsers();
      setUsers(users);
      if (!token) {
        setToken(localStorage.getItem('token'));
        return;
      }
      const data = await fetchUserData(token);
      if (data) {
        setUserData(data);
      }
    };
    fetchData();
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is actually freaking working! :D' : 'api is down :/');
    };
    getAPIStatus();
  }, [token]);

  return (
    <div className='app-container'>
      <NavBar />
      <Site 
        products={products}
        setToken={setToken}
        userData={userData}
        token={token}
        users={users}
      />
      
      <p>API Status: {APIHealth}</p>
    </div>
  );
};

export default App;
