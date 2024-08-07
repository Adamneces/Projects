import React from 'react'
import header_logo from '../assets/quiz-logo.png'


const Header = () => {
  return (
    <header>
      <img src={header_logo} alt='quiz logo' />
      <h1>React Quiz</h1>
    </header>
  )
}

export default Header
