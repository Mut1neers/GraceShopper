import React from 'react';
import { Grid }  from '@material-ui/core';
import { SingleProduct } from '..';





 const Products = ({products}) => {
    
  return ( 
   <main>
        
        <Grid container justify='center' spacing={4}>
            {products.map((product) => {
                return (
                    <SingleProduct 
                        key={product.id}
                        product={product}
                    />
                )
            })}
        </Grid>
    </main>
  )
}

export default Products