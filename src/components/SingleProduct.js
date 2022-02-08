import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';


import useStyles from './singleProductStyles';

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

export default SingleProduct;