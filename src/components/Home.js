import React from 'react'
import { Container, Typography, Button, Grid } from 
'@material-ui/core';
import nft from '../assets/nft.png';
import '../style/home.css';


const Home = () => {
  return (
    <div className='banner'>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className='title' variant='h1'>
              Welcome to rightClicked Webshop
            </Typography>
            <Button className='shoppingButton' href='./products'>
              Get Shopping
            </Button>
          </Grid>
          <Grid className='nftPng' item sm={6}>
            <img src={nft} alt='nfl logo' />
          </Grid>
          <Grid className='info'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </p>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Home