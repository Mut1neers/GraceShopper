import React, { useEffect, useState } from "react";
import { callApi } from "../api";
import "../style/cart.css";

const Cart = ({ token }) => {
  const [cart, setCart] = useState([]);
  const fetchCart = async () => {
    const cartResponse = await callApi({
      method: "GET",
      token,
      url: "/orders/cart",
    });
    setCart(cartResponse);
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  return (
    <div className="cart">
      <div>
        <h1>My NFT's - Shop</h1>
        <div className="cart-item-cards">
          <div>
            {cart.length ? (
              <div className="individual-card">
                <h2>Item Name</h2>
              </div>
            ) : (
              <h2>
                Your shopping cart is sad. Make it happy by adding some sweet
                NFT's!
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
