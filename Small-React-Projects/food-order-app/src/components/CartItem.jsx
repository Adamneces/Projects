import React from "react";
import { currencyFormatter } from "../utilities/formatting";

const CartItem = ({ name, quantity, price, onIncrease, onDecrease }) => {
  return (
    <li className="cart-item">
      <p>
        {name} -{" "}
        <strong>
          {quantity} x {currencyFormatter.format(price)}
        </strong>
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
