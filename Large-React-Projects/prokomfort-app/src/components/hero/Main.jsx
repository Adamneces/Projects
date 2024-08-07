import React from 'react'
import Header from './components/Header'
import Background from './components/Background'

import classes from "./styles/index.module.css"

export default function Hero() {
  return (
    <div className={classes.container} id='hero'>
      <Header />
      <Background />
    </div>
  )
}
