import classes from "../styles/index.module.css"
import LineContainer from "./LineContainer"

export default function GalleryContainer() {
  return (
    <div className={classes.galleryContainer}>
      <LineContainer />
      <LineContainer />
    </div>
  )
}
