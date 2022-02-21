import React, { useEffect, useState } from "react";
import { callApi } from "../api";

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

  return <div>Cart</div>;
};

export default Cart;
