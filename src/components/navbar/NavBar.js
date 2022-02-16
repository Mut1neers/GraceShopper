import React from 'react';
import Home from '../Home';
import AccountForm from '../AccountForm';
import Products from '../products/Products';
import './NavBar.css';


const MenuItems = [
    {
        title: 'Home',
        url: <Home />,
        class: 'nav-links'
    },
    {
        title: 'Products List',
        url: <Products />,
        class: 'nav-links'
    },
    {
        title: 'Register',
        url: <AccountForm />,
        class: 'nav-links'
    },
];


const NavBar = () => {

   
    return (
     <>
     <nav className='NavBarItems'>
         <h1 className='navbar-logo'>RightClicked</h1>
         <div className='menu-icon'>
             
             
         </div>
         <div className='search-bar'><input type='search' placeholder='Search Our Products Library'></input>
         <span className='fa fa-search'></span>
         </div>
         <ul>
             {MenuItems.map((item, index) => {
                 return (
                    <li key={index}>
                        <a className={item.class} href={item.url} >
                         {item.title}   
                        </a>
                    </li>
                 )
             })}
            
         </ul>
     </nav>
     </> 
    )

    }   


export default NavBar;
