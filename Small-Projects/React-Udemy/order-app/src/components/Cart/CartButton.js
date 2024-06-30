import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartPrice = useSelector(state => state.cart.totalPrice);

  const { toggle } = uiActions;

  function toggleCartHandler(){
    dispatch(toggle());
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>${cartPrice ? cartPrice.toFixed(2) : '0'}</span>
    </button>
  );
};

export default CartButton;
