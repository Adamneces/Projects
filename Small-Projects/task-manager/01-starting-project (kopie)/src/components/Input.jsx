import React from 'react'
import styles from './Input.module.css'

const Input = ({ label, isTextarea, ...props }) => {
  return (
    <p className={styles.paragraph}>
      <label className={styles.label}>{label}</label>
      {isTextarea ? <textarea className={styles.textarea} {...props} /> : <input className={styles.input} {...props} type="text" />}
    </p>
  )
}

export default Input
