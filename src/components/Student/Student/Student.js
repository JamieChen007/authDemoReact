import { useState } from "react";
import classes from "./Student.module.css";
import ConfirmModal from "../UI/ConfirmModal/ConfirmModal";
import TipsModal from "../UI/TipsModal/TipsModal";
import UpdateStuData from "./UpdateStuData/UpdateStuData";
import { useDelStudentMutation } from "../../../store/studentApi";

const Student = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [showTipsModal, setShowTipsModal] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);

  const [delStu, { isError, error }] = useDelStudentMutation();

  const cancelHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmHandler = () => {
    setShowConfirmModal(false);

    delStu(props.stu.id);

    setShowTipsModal(true);
  };

  const clickDelHandler = () => {
    setShowConfirmModal(true);
  };

  const tipsConfirmHandler = () => {
    setShowTipsModal(false);
  };

  const updateHandler = () => {
    setIsUpdate(true);
  };

  const updateCancelHandler = () => {
    setIsUpdate(false);
  };

  return (
    <>
      {!isUpdate && (
        <tr>
          <td className={classes.Td}>{props.stu.id}</td>
          <td className={classes.Td}>
            <p>{props.stu.attributes.name}</p>
          </td>
          <td className={classes.Td}>
            <p>{props.stu.attributes.gender}</p>
          </td>
          <td className={classes.Td}>
            <p>{props.stu.attributes.age}</p>
          </td>
          <td className={classes.Td}>
            <p>{props.stu.attributes.address}</p>
          </td>
          <td className={classes.Td}>
            <button onClick={clickDelHandler}>Delete</button>
            <button onClick={updateHandler}>Update</button>
          </td>
        </tr>
      )}

      {isUpdate && (
        <UpdateStuData onUpdateCancel={updateCancelHandler} id={props.stu.id} />
      )}

      {showConfirmModal && (
        <ConfirmModal
          tips={`Do you wish to delete ${props.stu.attributes.name}'s data?`}
          onConfirm={confirmHandler}
          onCancel={cancelHandler}
        />
      )}
      {showTipsModal && (
        <TipsModal
          tips={`Delete ${props.stu.attributes.name}'s data success!`}
          onConfirm={tipsConfirmHandler}
        />
      )}
      {isError && (
        <TipsModal tips={error.data} onConfirm={tipsConfirmHandler} />
      )}
    </>
  );
};

export default Student;
