import { useState, useEffect } from "react";
import TipsModal from "../../UI/TipsModal/TipsModal";
import {
  useAddStudentMutation,
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
} from "../../../../store/studentApi";
import classes from "./UpdateStuData.module.css";

const UpdateStuData = (props) => {
  const {
    data: stuData,
    isSuccess,
    isFetching,
    error,
  } = useGetStudentByIdQuery(props.id, {
    skip: !props.id,
    refetchOnMountOrArgChange: false,
  });

  const [newStu, setNewStu] = useState({
    id: props.id,
    name: "",
    gender: "male",
    age: 19,
    address: "",
  });

  const [
    addStudent,
    {
      isSuccess: isAddSuccess,
      isFetching: isAddFetching,
      status,
      isError: isAddError,
    },
  ] = useAddStudentMutation();

  const [updateStudent, { isSuccess: isUpdateSuccess }] =
    useUpdateStudentMutation();

  useEffect(() => {
    if (isSuccess) {
      setNewStu(stuData.attributes);
    }
  }, [isSuccess]);

  const [showTipsModal, setShowTipsModal] = useState(false);

  const [tipsInfo, setTipsInfo] = useState("");

  const clickUpdateHandler = () => {
    // setUpdateData(true);
    // props.onUpdate();
  };

  const clickConfirmHandler = () => {
    if (newStu.name === "" || newStu.address === "") {
      setTipsInfo("All information must be filled in!");
      return;
    }
    updateStudent({
      id: props.id,
      attributes: newStu,
    });

    props.onUpdateCancel();
  };

  const clickCancelHandler = () => {
    // setUpdateData(false);
    props.onUpdateCancel();
  };

  const tipsConfirmHandler = () => {
    setTipsInfo("");
  };

  const clickCreateHandler = () => {
    if (newStu.name === "" || newStu.address === "") {
      setTipsInfo("All information must be filled in!");

      return;
    }
    addStudent(newStu);
    setShowTipsModal(true);
    //reset data
    setNewStu({ name: "", gender: "male", age: 19, address: "" });
  };

  const nameChangeHandler = (e) => {
    setNewStu((prevState) => ({ ...prevState, name: e.target.value }));
  };

  const genderChangeHandler = (e) => {
    setNewStu((prevState) => ({ ...prevState, gender: e.target.value }));
  };

  const ageChangeHandler = (e) => {
    setNewStu((prevState) => ({ ...prevState, age: e.target.value }));
  };

  const addressChangeHandler = (e) => {
    setNewStu((prevState) => ({ ...prevState, address: e.target.value }));
  };

  return (
    <>
      <tr className={classes.StudentForm}>
        <td>{props.id}</td>
        <td>
          <input onChange={nameChangeHandler} value={newStu.name} type="text" />
        </td>
        <td>
          <select onChange={genderChangeHandler} value={newStu.gender}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </td>
        <td>
          <input onChange={ageChangeHandler} value={newStu.age} type="number" />
        </td>
        <td>
          <input
            onChange={addressChangeHandler}
            value={newStu.address}
            type="text"
          />
        </td>
        <td>
          {props.id && (
            <>
              <button onClick={clickCancelHandler}>Cancel</button>
              <button onClick={clickConfirmHandler}>Confirm</button>
            </>
          )}
          {!props.id && <button onClick={clickCreateHandler}>Create</button>}
        </td>
      </tr>
      {isAddFetching && <p>Data is creating...</p>}

      {tipsInfo && <TipsModal tips={tipsInfo} onConfirm={tipsConfirmHandler} />}
      {/*    {isSuccess && (
        <TipsModal tips={"result"} onConfirm={tipsConfirmHandler} />
      )} */}
    </>
  );
};

export default UpdateStuData;
