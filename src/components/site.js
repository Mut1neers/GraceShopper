import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    BrowserRouter
  } from "react-router-dom";
  import {Products, SingleProduct, AccountForm, SingleProductPage, Home, UserProfile } from './'


const Site = ({products, setToken, userData, token}) => {
    return (
        <BrowserRouter>
            <Route exact path="/">
            <Home />
            </Route>
            <Route exact path="/products">
                <Products 
                    products={products}
                />
            </Route>
            <Route exact path="/products/:productId">
                <SingleProductPage 
                    products={products}
                />
            </Route>
            <Route exact path="/login">
                <AccountForm
                    action='login'
                    setToken={setToken}
                />
            </Route>
            <Route exact path="/register">
                <AccountForm
                    action='register'
                    setToken={setToken}
                />
            </Route>
            <Route exact path="/user/:userId">
                <UserProfile
                    userData={userData}
                    token={token}
                />
            </Route>

            

        
        
        
        
        </BrowserRouter>
        

    )
}

export default Site