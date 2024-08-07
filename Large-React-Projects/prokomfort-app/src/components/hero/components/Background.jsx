import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import classes from "../styles/index.module.css";

export default function Background() {
  const buttonRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    // GSAP animations
    const jumpTimeline = gsap.timeline({ repeat: -1, repeatDelay: 29 }); // -1 for infinite repeat, 14 seconds delay
    
    jumpTimeline
      .to(buttonRef.current, { y: -60, duration: 0.25, ease: "sine" })
      .to(buttonRef.current, { y: 0, duration: 0.25, ease: "sine" })
      .to(buttonRef.current, { y: -40, duration: 0.25, ease: "sine" })
      .to(buttonRef.current, { y: 0, duration: 0.25, ease: "sine" });
  
    // Optional background color animation, if needed
    gsap.to(buttonRef.current, {
      backgroundColor: "#3BA582",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
  
    // Scroll event listener
    const handleScroll = () => {
      const scrollOffset = window.scrollY;
      setScrolled(scrollOffset > 100);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    // Cleanup on component unmount
    return () => {
      jumpTimeline.kill(); // Kill the timeline on component unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  return (
    <div className={classes.container_background}>
      <h1>
        INSTALACE A <span>SERVIS</span> STÍNÍCÍ TECHNIKY
      </h1>
      <button ref={buttonRef} style={{ marginLeft: scrolled ? "98%" : "50%", padding: scrolled ? '8px 8px' :'5px 35px' }}>
        {scrolled ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-phone"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
          </svg>
        ) : 'Kontakt'}
      </button>
    </div>
  );
}
