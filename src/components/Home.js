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
        </Grid>
      </Container>
    </div>
  )
}

export default Home