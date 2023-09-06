import classes from "./Backdrop.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  const backdropRoot = document.getElementById("backdrop-root");

  return ReactDOM.createPortal(
    <div className={classes.Backdrop}>{props.children}</div>,
    backdropRoot
  );
};

export default Backdrop;
