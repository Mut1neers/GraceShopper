import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
<<<<<<< HEAD:src/components/SingleProduct.js
// import { mergeClasses } from '@material-ui/styles';
=======
>>>>>>> main:src/components/products/SingleProduct.js


import useStyles from './singleProductStyles';

<<<<<<< HEAD:src/components/SingleProduct.js
const SingleProduct = ({ product }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image='' title={product.name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant='h4' gutterBottom>
            {product.name}
          </Typography>
          <Typography variant='h4'>{product.price}</Typography>
        </div>
        <Typography variant='h2' color='textSecondary'>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label='Add to Cart'>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};
=======
const SingleProduct = ({product}) => {
   const classes = useStyles();
   return (
       <Card className={classes.root}>
           <CardMedia className = {classes.media} image={product.image} title={product.name} />
           <CardContent>
               <div className={classes.cardContent}>
                   <Typography variant ="h4" gutterBottom>
                        {product.name}
                   </Typography>
                   <Typography variant = "h4">
                       {product.price}
                   </Typography>
               </div>
               <Typography variant ="body2" color="textSecondary">{product.description}</Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
               <IconButton aria-label="Add to Cart">
                 <AddShoppingCart />  
                </IconButton> 
            </CardActions>
       </Card>
   ) 
}
>>>>>>> main:src/components/products/SingleProduct.js

export default SingleProduct;