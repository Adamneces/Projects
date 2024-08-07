import React, { useRef } from "react";
import Input from "./Input";
import styles from "./modules/NewProjects.module.css";
import Modal from "./Modal";

const NewProjects = ({ onAdd, onCancel }) => {
  const modal = useRef();

  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Close">
        <h2 style={{ fontSize: "28px", letterSpacing: "1px" }}>
          Invalid Input
        </h2>
        <p style={{ fontSize: "19px", letterSpacing: "0.75px" }}>
          Oops.. looks like you forgot to enter some value
        </p>
        <p style={{ fontSize: "17px", letterSpacing: "0.75px" }}>
          Please make sure you provide a valid value for every input field
        </p>
      </Modal>
      <div className={styles.container}>
        <menu className={styles.menu}>
          <li>
            <button onClick={onCancel} className={styles.cancelBtn}>
              Cancel
            </button>
          </li>
          <li>
            <button onClick={handleSave} className={styles.saveBtn}>
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input ref={title} label="Title" type="text" />
          <Input ref={description} label="Description" isTextarea />
          <Input ref={dueDate} label="Due Date" type="date" />
        </div>
      </div>
    </>
  );
};

export default NewProjects;
