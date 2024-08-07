import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import classes from "../styles/index.module.css";
import Slide from "./Slide";
import { references } from "../utils/data";

export default function SlideContainer() {
  const containerRef = useRef(null);
  const [reviewNumber, setReviewNumber] = useState(0);

  let review = references[reviewNumber];

  function handleReviewChange(){
    setReviewNumber((prevReviewNumber) => (prevReviewNumber + 1) % references.length);
  }

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { backgroundColor: "rgba(255, 255, 255, 0.48)" },
      {
        backgroundColor: "rgba(255, 255, 255, 0.68)",
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      }
    );
  }, []);

  return (
    <div ref={containerRef} className={classes.container_slide_container}>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3B3C40"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </button>
      <Slide review={review} />
      <button onClick={handleReviewChange}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3B3C40"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </button>
    </div>
  );
}
