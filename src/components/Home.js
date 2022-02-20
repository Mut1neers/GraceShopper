import React, { Component } from 'react';
import { AccountForm } from './';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  state = { pageTitle: "Welcome to RightClicked, your home for fake NFTs!" };
  render() {
  return (
    <div className='home-container'>
      <h2 className='border-bottom  p-5'>{this.state.pageTitle}</h2>
      <h4 className='register p-5'>New to the site? Please Register Here <AccountForm />
      <h4> Already have an account? Click here to Go to <Link to='/users/me'>
                Profile Page
            </Link>.
        </h4>
      </h4>
      
    </div>
  )
  }
}

