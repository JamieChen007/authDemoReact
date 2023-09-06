import classes from "./TipsModal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const TipsModal = (props) => {
  return (
    <Backdrop>
      <div className={classes.TipsModal}>
        <div className={classes.TipsText}>
          <p>{props.tips}</p>
        </div>
        <div className={classes.ConfirmBtns}>
          <button className={classes.ConfirmBtn} onClick={props.onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

export default TipsModal;
