import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineShopping,
} from "react-icons/ai";

import { TiDeleteOutline } from "react-icons/ti";
import { Toast } from "react-hot-toast";
import { useStateContext } from "../Context/StateContext";
import { urlFor } from "../lib/client";

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantity, cartItems, setShowCart } =
    useStateContext();

  return <div>Cart</div>;
};

export default Cart;
