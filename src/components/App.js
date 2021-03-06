import React, { useState, useEffect } from "react";
import { callApi } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import { Site } from "./";

import { getAPIHealth } from "../axios-services";
import "../style/App.css";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [token, setToken] = useState("");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);
  const [serchterm, setSerchTerm] = useState([]);

  const fetchUserData = async (token) => {
    const data = await callApi({
      url: "/users/me",
      token,
    });
    return data;
  };

  const fetchUsers = async () => {
    const users = await callApi({
      url: "/users",
    });

    return users;
  };

  const fetchOrders = async () => {
    const orders = await callApi({ url: "/orders" });
    return orders;
  };
  const fetchProducts = async () => {
    const products = await callApi({ url: "/products" });
    return products;
  };

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

  useEffect(() => {
    const fetchData = async () => {
      const orders = await fetchOrders();
      setOrders(orders);
      const products = await fetchProducts();
      setProducts(products);
      if (!token) {
        setToken(localStorage.getItem("token"));
        return;
      }
      const users = await fetchUsers();
      setUsers(users);
      const data = await fetchUserData(token);
      if (data) {
        setUserData(data);
      }
    };
    fetchData();
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "_" : "API Error");
    };
    getAPIStatus();
  }, [token]);

  return (
    <div className="app-container">
      <Site
        products={products}
        setToken={setToken}
        userData={userData}
        token={token}
        users={users}
        orders={orders}
        cart={cart}
        setCart={setCart}
      />
    </div>
  );
};

export default App;
