import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Products, NavBar, AccountForm } from './';
import { callApi } from '../api';
import { getAPIHealth } from '../axios-services';
import '../style/App.css';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [token, setToken] = useState('');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState({});

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

  useEffect(() => {
    const fetchData = async () => {
      const orders = await fetchOrders();
      setOrders(orders);
      const products = await fetchProducts();
      setProducts(products);
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
      <Switch>
        <Route exact path='/products'>
          <Products products={products} />
        </Route>
        <Route path='/register'>
          <AccountForm action='register' setToken={setToken} setUserData={setUserData} />
        </Route>
        <Route path='/login'>
          {!token ? (
            <AccountForm action='login' setToken={setToken} setUserData={setUserData} />
          ) : (
            <>
              <div>You are already logged in!</div>
              <br />
            </>
          )}
        </Route>
      </Switch>

      <p>API Status: {APIHealth}</p>
    </div>
  );
};

export default App;
