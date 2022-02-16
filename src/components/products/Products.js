import React from 'react';
import { Grid }  from '@material-ui/core';
import { SingleProduct } from '..';
import { Link, useHistory, useParams } from "react-router-dom";




 const Products = ({products}) => {
    


  return ( 
   <main>
        
        <Grid container justify='center' spacing={4}>
            {products.map((product) => {
                return (
                    <Link to={`/products/:productId`}> 
                    <SingleProduct 

                        key={product.id}
                        product={product}
                    /></Link>
                )
            })}
        </Grid>
    </main>
  )
}

export default Products