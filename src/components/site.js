import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    BrowserRouter
  } from "react-router-dom";
  import {Products, 
    SingleProduct, 
    AccountForm, 
    UserProfile
} from './'


const Site = ({products, setToken, userData, token, users}) => {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/">
            <Products 
                    products={products}
                />
            </Route>
            <Route exact path="/products">
                <Products 
                    products={products}
                />
            </Route>
            <Route exact path="/products/:productId">
                <SingleProduct 
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
            <Route exact path='/users'>
                <h2>All users</h2>
            </Route>
            <Route path="/users/:userId">
                <UserProfile
                    users={users}
                    userData={userData}
                    token={token}
                />
            </Route>

            

        
        
        
            </Switch>
        </BrowserRouter>
        

    )
}

export default Site