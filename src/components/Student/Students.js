import Student from "./Student/Student";
import classes from "./Students.module.css";
import UpdateStuData from "./Student/UpdateStuData/UpdateStuData";
import { useGetStudentsQuery } from "../../store/studentApi";

const Students = (props) => {
  const { data: stus, isSuccess } = useGetStudentsQuery();
  return (
    <>
      <table className={classes.Table}>
        <caption>Student List</caption>
        <thead>
          <tr>
            <th className={classes.Th}>ID</th>
            <th className={classes.Th}>Name</th>
            <th className={classes.Th}>Gender</th>
            <th className={classes.Th}>Age</th>
            <th className={classes.Th}>Address</th>
            <th className={classes.Th}>Operation</th>
          </tr>
        </thead>

        <tbody>
          {isSuccess &&
            stus.map((item) => <Student key={item.id} stu={item} />)}
        </tbody>

        <tfoot>
          <UpdateStuData />
        </tfoot>
      </table>
    </>
  );
};

export default Students;
