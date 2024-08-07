import GalleryContainer from "./components/GalleryContainer"
import classes from "./styles/index.module.css"

export default function Gallery() {
  return (
    <div className={classes.container}>
      <div className={classes.picture}></div>
      <GalleryContainer />
    </div>
  )
}
