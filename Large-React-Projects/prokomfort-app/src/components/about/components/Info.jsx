import classes from "../styles/index.module.css";
import { infoParagraphData } from "../utils/data";
import MainInfoText from "./custom/MainInfoText";

export default function Info({ hoverText }) {
  return (
    <div className={classes.container_info}>
      {(hoverText !== "") ? <p>{infoParagraphData[hoverText]}</p> : (
       <MainInfoText />
      )}
    </div>
  );
}
