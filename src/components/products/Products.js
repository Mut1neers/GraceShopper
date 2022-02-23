import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { SingleProduct } from "..";
import { Link, useHistory, useParams } from "react-router-dom";
import "../../style/products.css";




 const Products = ({products, cart, setCart, addToCart}) => {

      const history = useHistory();
  return ( 
   <main>
       <div className='title'>Browse Through Tons of Fake NFTS</div>
        
        <Grid container justify='center' spacing={4}>
            {products.map((product) => {
                return (
                   
                    <SingleProduct 

                        key={product.id}
                        product={product}
                        cart={cart}
                        setCart={setCart}
                        addToCart={addToCart}
                    />
                    
                )
            
            })}
        </Grid>
    </main>
  );
};

export default Products;
