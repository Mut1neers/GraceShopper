import React, {useState} from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import useStyles from './singleProductStyles';
import { set } from 'react-hook-form';

const SingleProduct = ({product, cart, setCart}) => {

    const addToCart = (product) => {
        
        console.log("product Clicked", product)
        const inCart = cart.find((cartItem) => cartItem.id === product.id) 
        console.log('inCart', inCart)
        if (inCart) {
          setCart(cart.map((cartItem) => 
            cartItem.id === product.id ? {...inCart, ammount: inCart.ammount + 1} : cartItem))
        } else {
            setCart([...cart, {...product, ammount: 1}])
        }
        console.log('Cart:', cart)
     }

   const classes = useStyles();
   return (
       <Card className={classes.root}>
           <CardMedia className = {classes.media} image={product.imageurl} title={product.name} />
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
            <button onClick={() => addToCart(product)}><AddShoppingCart />  </button> 
              
            </CardActions>
       </Card>
   ) 
}

export default SingleProduct;
