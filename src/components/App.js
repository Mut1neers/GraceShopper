import React, { useState, useEffect } from 'react';
import {callApi} from '../api'

import { Site, NavBar } from './';


// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
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

  const [products, setProducts] = useState({})


  const fetchProducts = async () => {
    const productsList = await callApi({
     url: '/products',
    });
    
    return productsList
  }

  useEffect(async () => {
    
   
    const allProducts = await fetchProducts()
    console.log('all Products', allProducts)
    setProducts(allProducts)
    

    

  }, [])

  return (
    <div className='app-container'>
      <NavBar />
      <Site 
        products={products}
      />
      
      <p>API Status: {APIHealth}</p>
    </div>
  );
};

export default App;
