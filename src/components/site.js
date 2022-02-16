import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    BrowserRouter
  } from "react-router-dom";
<<<<<<< HEAD
  import {Products, SingleProduct, AccountForm, SingleProductPage} from './'
=======
  import {Products, SingleProduct, AccountForm, Home } from './'
>>>>>>> main


const Site = ({products, setToken}) => {
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
                    action={'login'}
                    setToken={setToken}
                />
            </Route>
            <Route exact path="/register">
                <AccountForm
                    action='register'
                    setToken={setToken}
                />
            </Route>

            

        
        
        
        
        </BrowserRouter>
        

    )
}

export default Site