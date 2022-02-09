import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    BrowserRouter
  } from "react-router-dom";
  import {Products, SingleProduct} from './'


const Site = ({products}) => {
    return (
        <BrowserRouter>
            <Route exact path="/">
                <div>Hello World</div>
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
            

        
        
        
        
        </BrowserRouter>
        

    )
}

export default Site