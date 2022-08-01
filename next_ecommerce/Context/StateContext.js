import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

//BASE CONTEXT
const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [quantity, setQuantity] = useState(1);

  //ADD PRODUCT TO CART
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        }
      });
      setCartItems(updatedCartItems);
      toast.success(`${quantity} ${product.name} added to the cart`);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
  };

  //INCREASE ITEM QUANTITY FOR PURCHASE
  const increaseQty = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  //DECREASE ITEM QUANTITY FOR PURCHASE
  const decreaseQty = () => {
    setQuantity((prevQty) => {
      if (prevQty - 1 < 1) {
        return 1;
      }
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantity,
        quantity,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </Context.Provider>
  );
};

//FUNCTION USED TO CALL THE CONTEXT
//DESTRUCTURE THE CONTEXT ELEMENTS YOU DESIRE TO USE FROM IT
export const useStateContext = () => useContext(Context);
