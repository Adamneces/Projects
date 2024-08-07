import { useState } from "react";
import classes from "../../styles/index.module.css";

export default function PictureBlock({ name, img, setHoverText, hoverText }) {
  function handleMouseEnter(){
    setHoverText(name)
  }

  function handleMouseLeave(){
    setHoverText("")
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className={classes.container_picture_block}
    >
      <div className={classes.aside_color_container}>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-forward"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 11l4 4l-4 4m4 -4h-11a4 4 0 0 1 0 -8h1" />
          </svg>
        </button>
        <h2>{name}</h2>
      </div>
    </div>
  );
}
