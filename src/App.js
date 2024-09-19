import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Products from './components/Products';
import ProductItemDetails from './components/ProductItemDetails';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import CartContext from './context/CartContext';

import './App.css';

const App = () => {
  const [cartList, setCartList] = useState([]);

  const removeAllCartItems = () => {
    setCartList([]);
  };

  const incrementCartItemQuantity = (id) => {
    setCartList((prevCartList) =>
      prevCartList.map((eachCartItem) => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1;
          return { ...eachCartItem, quantity: updatedQuantity };
        }
        return eachCartItem;
      })
    );
  };

  const decrementCartItemQuantity = (id) => {
    const productObject = cartList.find((eachCartItem) => eachCartItem.id === id);
    if (productObject.quantity > 1) {
      setCartList((prevCartList) =>
        prevCartList.map((eachCartItem) => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1;
            return { ...eachCartItem, quantity: updatedQuantity };
          }
          return eachCartItem;
        })
      );
    } else {
      removeCartItem(id);
    }
  };

  const removeCartItem = (id) => {
    const updatedCartList = cartList.filter((eachCartItem) => eachCartItem.id !== id);
    setCartList(updatedCartList);
  };

  const addCartItem = (product) => {
    const productObject = cartList.find((eachCartItem) => eachCartItem.id === product.id);
    if (productObject) {
      setCartList((prevCartList) =>
        prevCartList.map((eachCartItem) => {
          if (productObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity;
            return { ...eachCartItem, quantity: updatedQuantity };
          }
          return eachCartItem;
        })
      );
    } else {
      const updatedCartList = [...cartList, product];
      setCartList(updatedCartList);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<ProtectedRoute element={Home} />} />
        <Route path="/products" element={<ProtectedRoute element={Products} />} />
        <Route path="/products/:id" element={<ProtectedRoute element={ProductItemDetails} />} />
        <Route path="/cart" element={<ProtectedRoute element={Cart} />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </CartContext.Provider>
  );
};

export default App;
