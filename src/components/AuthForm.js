import { useRef, useState } from "react";
import { useRegisterMutation, useLoginMutation } from "../store/authApi";
import { useDispatch } from "react-redux";
import { login } from "../store/reducer/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

const AuthForm = () => {
  const accountInp = useRef();
  const pwdInp = useRef();
  const emailInp = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.preLocation?.pathname || "/";

  const [isLoginForm, setIsLoginForm] = useState(true);

  const [regFn, { error: regError }] = useRegisterMutation();

  const [loginFn, { error: loginError }] = useLoginMutation();

  const submitHandler = (e) => {
    e.preventDefault();

    const username = accountInp.current.value;
    const password = pwdInp.current.value;
    let email = "";

    if (!isLoginForm) {
      email = emailInp.current.value;

      regFn({ username, password, email }).then((res) => {
        if (!res.error) {
          setIsLoginForm(true);
        }
      });
    } else {
      loginFn({
        identifier: username,
        password,
      }).then((res) => {
        if (!res.error) {
          dispatch(
            login({
              isLogged: true,
              token: res.data.jwt,
              user: res.data.user,
            })
          );
          navigate(from, { replace: true });
        }
      });
    }
  };

  const clickAHandler = (e) => {
    e.preventDefault();
    setIsLoginForm((prevState) => !prevState);
  };

  return (
    <div>
      {regError && (
        <p style={{ color: "red" }}>{regError.data.error.message}</p>
      )}
      {loginError && (
        <p style={{ color: "red" }}>{loginError.data.error.message}</p>
      )}
      <h2>{isLoginForm ? "Login" : "Register"}</h2>
      <form onSubmit={submitHandler}>
        <div>
          <input ref={accountInp} type="text" placeholder="account" />
        </div>
        {!isLoginForm && (
          <div>
            <input ref={emailInp} type="email" placeholder="email" />
          </div>
        )}
        <div>
          <input ref={pwdInp} type="password" placeholder="password" />
        </div>
        <div>
          <button>{isLoginForm ? "Login" : "Register"}</button>
          <a href="#" onClick={clickAHandler}>
            {isLoginForm ? "Click to Register" : "Click to Login"}
          </a>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
