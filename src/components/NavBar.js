import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './navbarStyles';
// import { mergeClasses } from '@material-ui/styles';

import logo from '../assets/logo.png'

const NavBar = () => {
    const classes = useStyles();
   return (
       <>
            <AppBar position='fixed' className={classes.appbar} color='inherit'>
                <Toolbar>
                    <Typography variatnt='h6' className={classes.title} color='inherit'>
                        <img src={logo} atl='rightClicked' height='45px' className={classes.image}/>
                        <h1>rightClicked Marketplace</h1>
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.button}>
                        <IconButton aria-label='Show Cart Items' color='inherit'>
                            <Badge badgeContent = {2} color='inherit'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
       </>
   ) 
}

export default NavBar;