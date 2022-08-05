import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "./Context/StateContext";
import exportFirework from "./lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    exportFirework();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your purchase</h2>
        <p className="email-msg">Check your email inbox for your receipt.</p>
        <p className="description">
          If you have any questions please email{" "}
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default success;
