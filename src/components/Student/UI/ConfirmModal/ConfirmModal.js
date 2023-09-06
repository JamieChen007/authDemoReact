import classes from "./ConfirmModal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const ConfirmModal = (props) => {
  return (
    <Backdrop>
      <div className={classes.ConfirmModal}>
        <div className={classes.ConfirmTips}>
          <p>{props.tips}</p>
        </div>
        <div className={classes.ConfirmBtns}>
          <button className={classes.ConfirmBtn} onClick={props.onConfirm}>
            Confirm
          </button>
          <button className={classes.CancelBtn} onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

export default ConfirmModal;
