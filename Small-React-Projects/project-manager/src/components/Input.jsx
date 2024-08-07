import React, { forwardRef } from "react";
import styles from "./modules/Input.module.css";

const Input = forwardRef(function Input({ label, isTextarea, ...props }, ref) {
  return (
    <p className={styles.paragraph}>
      <label className={styles.label}>{label}</label>
      {isTextarea ? (
        <textarea ref={ref} className={styles.textarea} {...props} />
      ) : (
        <input ref={ref} className={styles.input} {...props} />
      )}
    </p>
  );
});

export default Input;
