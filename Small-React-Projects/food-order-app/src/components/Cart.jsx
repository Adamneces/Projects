import { useContext } from "react";

import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

import CartItem from "./CartItem";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { currencyFormatter } from "../utilities/formatting";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userCtx.hideCart();
  }

  function handleGoToCheckout() {
    userCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userCtx.progress === "cart"}
      onClose={userCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => {
          return (
            <CartItem
              onIncrease={() => cartCtx.addItem(item)}
              onDecrease={() => cartCtx.removeItem(item.id)}
              key={item.id}
              {...item}
            />
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
