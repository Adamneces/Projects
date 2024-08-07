import React from 'react'
import classes from "../styles/index.module.css"

export default function Header() {
  return (
    <nav className={classes.container_header}>
        <h1>PRO <span>KOMFORT</span></h1> 
      <ul>
        <li><a href='www.facebook.com'>HOME</a></li>
        <li><a href='www.facebook.com'>SLUŽBY</a></li>
        <li><a href='www.facebook.com'>KONTAKT</a></li>
      </ul>
    </nav>
  )
}
