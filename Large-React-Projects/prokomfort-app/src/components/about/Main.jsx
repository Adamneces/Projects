import BlockContainer from "./components/BlockContainer";
import Info from "./components/Info";
import classes from "./styles/index.module.css";

export default function About() {
  return (
    <div className={classes.container}>
      <div className={classes.headingContainer}>
        <div className={classes.greenLine}></div>
        <h1>Čím se zabýváme?</h1>
        <div className={classes.greenLine}></div>
      </div>
      <BlockContainer />
      <Info />
    </div>
  );
}
