import classes from "../styles/index.module.css"
import Picture from './Picture'

export default function LineContainer() {
  return (
    <div className={classes.lineContainer}>
      <Picture />
      <Picture />
      <Picture />
    </div>
  )
}
