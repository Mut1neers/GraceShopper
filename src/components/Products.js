import React from 'react';
import { Grid }  from '@material-ui/core';
import { SingleProduct } from './';
import useStyles from './productsStyles';


const products = [
    { id: 1, name: 'Ape NFT', description: 'Fake Ape NFT', price: '$5', image:'https://tinyurl.com/yu6beu5k'},
    { id: 2, name: 'Glitter Sparkle Bomb NFT', description: 'Fake special made glitter bomb NFT ', price: '10$', image:'https://tinyurl.com/5h492yta'},
  ];

const Products = () => {
  const classes = useStyles();
    return ( 
        <main className={classes.content}>
          <div className={classes.toolbar} />
            <Grid container justify='center' spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={6} lg={6}>
                        <SingleProduct 
                        key={product.id}
                        product={product}
                    />
                    </Grid>
            ))}
            </Grid>
    </main>
  )
}

export default Products