import React from "react";
import {useHistory} from 'react-router-dom'
import "../style/cart.css";

const Cart = ({ cart, setCart, removeFromCart }) => {
  const history = useHistory()
  const checkOut = (event) => {
    setCart('') 
    history.push('/')
  }

  return (
    <div className="cart">
      <div>
        <h1 className="title-info">My NFT's - Shop</h1>
        <div className="cart-item-cards">
          <div>
            <div className="cartItems">
            { !cart.length ? (
              <div className="individual-card">
                <h2>No Products</h2>
              </div>
            ) : (
            <div>
             { cart.map((cartItem) => {
               return <div key={cartItem.id}>
                 <img src={cartItem.imageurl} />
                  <h3>{cartItem.name}</h3>
                  <h3>{cartItem.price}</h3>
                  <h3>{cartItem.ammount}</h3>
                 
                </div>
              })}
            </div>
            )}
            </div>
          </div>
            <div className="cartCheckout">
            { cart.length ? (
              <div className="individual-card">
                {cart.map((cartItem) => {
                  return (
                    <div checkOutItem>
                      <h3>{cartItem.name} -- {cartItem.ammount} -- {cartItem.price * cartItem.ammount}</h3>
                      <button onClick={() => removeFromCart(cartItem)}>Remove me</button>
                    </div>
                    
                  )
                })}
                <button onClick={checkOut}>Check Out</button>
              </div>
            ) : (
              <h2></h2>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
