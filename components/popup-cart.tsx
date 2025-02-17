import React from "react";
import CartPopUpThree from "./shopping-cart/cart-popup-three";
import CartPopUpFour from "./shopping-cart/cart-popup-four";
import CartPopUpFive from "./shopping-cart/cart-popup-five";
import CartPopUpSix from "./shopping-cart/six/cart-popup-six";

const PopUpCart = ({ theme }: any) => {
  return (
    <>
      {/* 1. square middle  */}
      {/* 2. square bottom  */}
      {/* 3. circle  */}
      {/* 4. square animated  */}
      {theme === "default" && <CartPopUpThree />}
      {theme === "one" && <CartPopUpSix />}
      {theme === "two" && <CartPopUpFour />}
      {theme === "three" && <CartPopUpThree />}
      {theme === "four" && <CartPopUpFour />}
      {theme === "five" && <CartPopUpFive />}
    </>
  );
};

export default PopUpCart;
