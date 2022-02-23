import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  BrowserRouter,
} from "react-router-dom";
import {
  Products,
  AccountForm,
  SingleProductPage,
  Home,
  UserProfile,
  NavBar,
  Cart,
  Login,
  Footer
} from "./";

const Site = ({ products, setToken, userData, token, users, orders }) => {
    const [cart, setCart] = useState([])
    const addToCart = (product) => {
        
        console.log("product Clicked", product)
        const inCart = cart.find((cartItem) => cartItem.id === product.id) 
        console.log('inCart', inCart)
        if (inCart) {
          setCart(cart.map((cartItem) => 
            cartItem.id === product.id ? {...inCart, ammount: inCart.ammount + 1} : cartItem))
        } else {
            setCart([...cart, {...product, ammount: 1}])
        }
        console.log('Cart:', cart)
     }
     const removeFromCart = (product) => {
        const inCart = cart.find((cartItem) => cartItem.id === product.id) 
        if(inCart.ammount === 1) {
            setCart(cart.filter((cartItem) => cartItem.id !== product.id))
        } else {
            setCart(cart.map((cartItem) => 
            cartItem.id === product.id ? {...inCart, ammount: inCart.ammount - 1} : cartItem ))
        }
        console.log('item removed', cart)
     }

  return (
    <BrowserRouter>
      <NavBar setToken={setToken} token={token} />
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/products">
          <Products products={products} cart={cart} setCart={setCart} addToCart={addToCart}/>
        </Route>
        <Route exact path="/products/:productId">
          <SingleProductPage products={products} cart={cart} setCart={setCart} addToCart={addToCart}/>
        </Route>

        <Route path="/login">
          <Login setToken={setToken} />
        </Route>
        <Route path="/register">
          <AccountForm action="register" setToken={setToken} />
        </Route>
        <Route exact path="/users/me">
          <UserProfile
            userData={userData}
            token={token}
            users={users}
            orders={orders}
            action="myAccount"
          />
        </Route>
        <Route exact path="/cart">
          <Cart
            userData={userData}
            token={token}
            users={users}
            orders={orders}
            cart={cart}
            setCart={setCart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Site;
