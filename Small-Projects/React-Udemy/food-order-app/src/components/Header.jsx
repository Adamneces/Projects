import React from 'react'
import logoImg from "../assets/logo.jpg"
import Button from './UI/Button'
import { useContext } from 'react'
import CartContext from '../store/CartContext.jsx'
import UserProgressContext from '../store/UserProgressContext.jsx'

const Header = () => {
 const cartCtx = useContext(CartContext);
 const userCtx = useContext(UserProgressContext); 

 const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
  return totalNumberOfItems + item.quantity;
 }, 0);

 function handleShowCart(){
  userCtx.showCart();
 }

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='restaurant logo' />
        <h1>Adam's Cousine</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  )
}

export default Header
