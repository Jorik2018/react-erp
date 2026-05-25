import { useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Wrapper, Content } from "./sign-in.styles";
import { submitHandler } from "./Sign-in.handlers";
import { setParam } from "../../Global/global-functions";

import { signInReducer } from "./Sign-in.reducer";

import { authContext } from "../../App";
import axios from "axios";

const SignIn = () => {
  const { setAuth } = useContext(authContext);

  const navigator = useNavigate();

  const initialState = {
    username: "",
    password: "",
    validUsername: true,
    validPassword: true,
    validLogin: true,
  };

  const [state, dispatch] = useReducer(signInReducer, initialState);
  const { username, password, validUsername, validPassword, validLogin } =
    state;

  const nav = () => {
    const URL = "http://localhost:8000/auth/whoami/role/";
    const TOKEN = sessionStorage.getItem("token");

    axios
      .get(URL, {
        headers: { Authorization: `Token ${TOKEN}` },
      })
      .then((a) => {
        navigator(
          `./accounts/${sessionStorage.getItem("user")}/${setParam(
            a.data.role
          )}/info`
        );
      });
  };

  return (
    <Wrapper>
      <Content>
        <form
          onSubmit={(e) => submitHandler(e, state, dispatch, setAuth, nav)}
        >
          <div className="flex-item label">
            nombre de usuario</div>
          <div className="flex-item input">
            <input
              autoFocus
              className="inp"
              type="text"
              value={username}
              onChange={(e) =>
                dispatch({ type: "SET-USERNAME", payload: e.target.value })
              }
              placeholder="Código Nacional"
            />
            <div
              className={validUsername ? "error-msg-hide" : "error-msg-show"}
            >
              Por favor, ingrese su nombre de usuario
            </div>
          </div>
          <div className="flex-item label">رمز عبور</div>
          <div className="flex-item input">
            <input
              className="inp"
              type="password"
              value={password}
              onChange={(e) =>
                dispatch({ type: "SET-PASSWORD", payload: e.target.value })
              }
              placeholder="رمز عبور"
            />
            <div
              className={validPassword ? "error-msg-hide" : "error-msg-show"}
            >
              Por favor, introduzca su contraseña
            </div>
          </div>
          <div className="flex-item submit">
            <div
              className={
                validLogin
                  ? "error-msg-hide errorLogin"
                  : "error-msg-show errorLogin"
              }
            >
              El nombre de usuario o la contraseña no son correctos.
            </div>
            <button type="submit" className="button">
              acceso
            </button>
          </div>
        </form>
      </Content>
    </Wrapper>
  );
};

export default SignIn;
