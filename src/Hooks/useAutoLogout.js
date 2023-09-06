import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducer/authSlice";

export const useAutoLogout = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = auth.expirationTime - Date.now();

    if (timeout < 60000) {
      dispatch(logout());
      return;
    }

    const timer = setTimeout(() => {
      dispatch(logout());
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [auth]);
};
