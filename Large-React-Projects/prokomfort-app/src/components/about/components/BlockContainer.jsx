import { useState } from "react";
import PictureBlock from './custom/PictureBlock';
import { aboutData } from '../utils/data';
import classes from "../styles/index.module.css";
import Info from './Info';

export default function BlockContainer() {
  const [hoverText, setHoverText] = useState("");

  return (
    <div className={classes.container_block_container}>
      {aboutData.map(child => (
        <PictureBlock
          key={child.name}
          name={child.name}
          img={child.img}
          setHoverText={setHoverText}
          hoverText={hoverText}
        />
      ))}
      <Info hoverText={hoverText} />
    </div>
  );
}
