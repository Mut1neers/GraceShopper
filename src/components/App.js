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
  
  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is actually freaking working! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

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
    <div className="app-container">
      <NavBar />
      <Site 
        products={products}
      />
      
      <p>API Status: {APIHealth}</p>
    </div>
  );
};

export default App;
