import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/reducer/authSlice";

const MainMenu = () => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <header>
      <ul>
        <li>
          <Link to={"/"}>Home Page</Link>
        </li>
        {!auth.isLogged && (
          <li>
            <Link to={"/auth-form"}>Login/Register</Link>
          </li>
        )}

        {auth.isLogged && (
          <>
            <li>
              <Link to={"/profile"}>{auth.user.username}</Link>
            </li>
            <li>
              <Link to={"/student"}>Student Info</Link>
            </li>
            <li>
              <Link
                to={"/"}
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default MainMenu;
