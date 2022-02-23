import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';




const NavBar = ({token, setToken}) => {
const [isLoggedin, setIsLoggedIn] = useState(false)

useEffect(() => {
    if (localStorage.getItem("token")){
        setIsLoggedIn(true); 
    }else {
        setIsLoggedIn(false); 
    }
    
},[token])
   
    return (
     <>
     <nav className='NavBarItems'>
         <h1 className='navbar-logo'>RightClicked</h1>
         <div className='menu-icon'>
             
             
         </div>
         
        <div className='Links-block'>
            <span className='links'>
            <Link to='/'>
                Home
            </Link>
            </span>
            <span className='links'>
            <Link to='/products'>
                Products List
            </Link>
            </span>
            <span className='links'>
                {token ? (
                    <span className='links'>
                    <Link to='/'
                    onClick = {()=>{
                        alert("You have been Logged Out")
                        setToken("")

                        setIsLoggedIn(false)
                        localStorage.removeItem("token");
                    }}>
                        Logout
                    </Link>
                    </span>
                ) : (
                    <span>  <Link to='/login'>
                Sign In
            </Link> / <Link to='/register'>
                Sign Up
            </Link>  </span>
                    
                )}
           
            </span>
            
           
            
            <span className='links'>
            <Link to='/users/me'>
                Profile
            </Link>
            </span>
            <span className='links'>
            <Link to='/cart' className="ml-auto">
                <button>
                    <i className='fas fa-cart-plus' />
                    Shopping Cart
                </button> 
            </Link>
            </span>
        </div>
     </nav>
     </> 
    )

    }   


export default NavBar;
