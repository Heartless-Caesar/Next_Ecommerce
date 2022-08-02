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
  let foundItem;
  let index;

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
  //REMOVE ITEM FROM CART
  const onRemove = (product) => {
    foundItem = cartItems.find((item) => item._id === product._id);
    const updatedCartItems = cartItems.filter(
      (item) => item._id !== foundItem._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice - foundItem.price * foundItem.quantity
    );
    setTotalQuantity(
      (prevTotalQuantity) => prevTotalQuantity - foundItem.quantity
    );
    setCartItems(updatedCartItems);
  };
  //CHANGE PRODUCT QUANTITY IN THE CART OFFSET
  const toggleCartItemQuantity = (id, value) => {
    foundItem = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const updatedCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      updatedCartItems = cartItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
      setCartItems([...updatedCartItems]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundItem.price);
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
    } else if (value === "dec") {
      if (foundItem.quantity > 1) {
        updatedCartItems = cartItems.map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        );
        setCartItems([...updatedCartItems]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundItem.price);
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
      }
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
        setShowCart,
        increaseQty,
        decreaseQty,
        onAdd,
        onRemove,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

//FUNCTION USED TO CALL THE CONTEXT
//DESTRUCTURE THE CONTEXT ELEMENTS YOU DESIRE TO USE FROM IT
export const useStateContext = () => useContext(Context);
