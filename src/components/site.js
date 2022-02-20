import React from 'react';
import { BrowserRouter as Router, Switch, Route, useParams, BrowserRouter } from 'react-router-dom';
import { Products, AccountForm, SingleProductPage, Home, UserProfile, NavBar, Cart, Login } from './';

const Site = ({ products, setToken, userData, token, users, orders }) => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />

        <Route exact path='/products'>
          <Products products={products} />
        </Route>
        <Route exact path='/products/:productId'>
          <SingleProductPage products={products} />
        </Route>
        <Route exact path='/login'>
          <Login action='login' setToken={setToken} />
        </Route>
        <Route exact path='/register'>
          <AccountForm action='register' setToken={setToken} />
        </Route>
        <Route exact path='/users/me'>
          <UserProfile userData={userData} token={token} users={users} orders={orders} action='myAccount' />
        </Route>
        <Route exact path='/cart'>
          <Cart userData={userData} token={token} users={users} orders={orders} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Site;
